import { EsewaCheckStatus } from 'esewajs';
import Transaction from '../models/transactionModel.js';
import { initiateEsewaPaymentInternal } from '../utils/initiateEsewaPayment.js';
import Client from '../models/clientModal.js';
import createAndSendToken from '../utils/token.js';

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
      transaction.paidAt = new Date();

      // ✅ Calculate expiry based on planType
      let monthsToAdd = 0;
      if (transaction.planType === 'basic') {
        monthsToAdd = 1;
      } else if (transaction.planType === 'enterprise') {
        monthsToAdd = 6;
      }

      // ✅ Set expiry date // WATCH OUT FOR THEIR DUPLICATED VALUES IN THEIR BACKEND
      const expiresOn = new Date();
      expiresOn.setMonth(expiresOn.getMonth() + monthsToAdd);
      transaction.expiresOn = expiresOn;

      await transaction.save();

      await Client.findOneAndUpdate(
        {
          _id: transaction.user._id,
        },
        { active: true },
      );

      const user = { id: String(transaction.user) };

      createAndSendToken(user, 200, res);

      //   return res
      //     .status(200)
      //     .json({ message: 'Transaction status updated successfully' });
    } else {
      // Payment failed or pending
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

// Left to do
// 2. If it works, let the admin handle the payment link sending process
// 3. Show the payment success process properly for both situations
