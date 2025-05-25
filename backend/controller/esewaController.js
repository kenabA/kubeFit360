import { EsewaCheckStatus } from 'esewajs';
import Transaction from '../models/transactionModel.js';
import { initiateEsewaPaymentInternal } from '../utils/initiateEsewaPayment.js';
import Client from '../models/clientModal.js';

import {
  createAndSendAndMailToken,
  createAndSendToken,
} from '../utils/token.js';

const EsewaInitiatePayment = async (req, res) => {
  const { user_id, membershipType, transaction_uuid } = req.body;

  try {
    const paymentUrl = await initiateEsewaPaymentInternal({
      user_id,
      membershipType,
      transaction_uuid,
    });

    return res.send({ url: paymentUrl });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Failed to initiate payment' });
  }
};

const paymentStatus = async (req, res) => {
  const { transaction_uuid } = req.body; // Extract data from request body
  try {
    // Find the transaction by its signature
    const transaction = await Transaction.findOne({ transaction_uuid });
    if (!transaction) {
      return res.status(400).json({ message: 'Transaction not found' });
    }

    const paymentStatusCheck = await EsewaCheckStatus(
      transaction.amount,
      transaction.transaction_uuid,
      process.env.MERCHANT_ID,
      process.env.ESEWAPAYMENT_STATUS_CHECK_URL,
    );

    if (
      paymentStatusCheck.status === 200 &&
      paymentStatusCheck.data.status === 'COMPLETE'
    ) {
      // ✅ Set payment completed date
      transaction.status = 'COMPLETE';

      const client = await Client.findById(transaction.user._id);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      if (client.active) {
        if (client.membershipType === transaction.planType) {
          // ✅ Calculate expiry based on planType
          let monthsToAdd = 0;
          if (transaction.planType === 'basic') {
            monthsToAdd = 1;
          } else if (transaction.planType === 'enterprise') {
            monthsToAdd = 6;
          }

          const nowUTC = new Date();
          const nepalTime = new Date(nowUTC.getTime() + 345 * 60 * 1000);
          transaction.paidAt = nepalTime;

          // ✅ Set expiry date // WATCH OUT FOR THEIR DUPLICATED VALUES IN THEIR BACKEND
          const newExpiry = new Date(client.renewalDate);
          newExpiry.setMonth(newExpiry.getMonth() + monthsToAdd);

          transaction.expiresOn = newExpiry;
          client.renewalDate = newExpiry;
          client.active = true;

          await transaction.save();
          await client.save({ validateBeforeSave: false });
          await createAndSendToken(client, 200, res);
        } else {
          const nowUTC = new Date();
          const nepalTime = new Date(nowUTC.getTime() + 345 * 60 * 1000);
          transaction.paidAt = nepalTime;
          let monthsToAdd = 0;
          if (transaction.planType === 'basic') {
            return;
          } else if (transaction.planType === 'enterprise') {
            monthsToAdd = 6;
            client.membershipType = 'enterprise';
            // ✅ Set expiry date // WATCH OUT FOR THEIR DUPLICATED VALUES IN THEIR BACKEND
            const newExpiry = new Date(client.renewalDate);
            newExpiry.setMonth(newExpiry.getMonth() + monthsToAdd);
            transaction.expiresOn = newExpiry;
            client.renewalDate = newExpiry;
            client.active = true;
            await transaction.save();
            await client.save({ validateBeforeSave: false });
            await createAndSendToken(client, 200, res);
          }
        }
      } else {
        // ✅ Calculate expiry based on planType
        let monthsToAdd = 0;
        if (transaction.planType === 'basic') {
          monthsToAdd = 1;
        } else if (transaction.planType === 'enterprise') {
          monthsToAdd = 6;
        }

        const nowUTC = new Date();
        const nepalTime = new Date(nowUTC.getTime() + 345 * 60 * 1000);
        transaction.paidAt = nepalTime;

        // ✅ Set expiry date // WATCH OUT FOR THEIR DUPLICATED VALUES IN THEIR BACKEND
        const expiresOn = new Date(nepalTime);
        expiresOn.setMonth(expiresOn.getMonth() + monthsToAdd);
        transaction.expiresOn = expiresOn;

        await transaction.save();

        // Modify the client object
        client.status = 'active';
        client.active = true;
        client.renewalDate = expiresOn;

        await createAndSendAndMailToken(client, 200, res);
      }
    } else {
      return res
        .status(400)
        .json({ message: 'Payment not completed yet or failed' });
    }
  } catch (error) {
    console.error('Error updating transaction status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { EsewaInitiatePayment, paymentStatus };
