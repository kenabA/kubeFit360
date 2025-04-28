import { EsewaCheckStatus } from 'esewajs';
import Transaction from '../models/transactionModel.js';
import { initiateEsewaPaymentInternal } from '../utils/initiateEsewaPayment.js';

const EsewaInitiatePayment = async (req, res) => {
  const { amount, transaction_uuid } = req.body;

  try {
    const paymentUrl = await initiateEsewaPaymentInternal({
      amount,
      transaction_uuid,
    });

    const transaction = new Transaction({
      transaction_uuid: transaction_uuid,
      amount: amount,
      planType: 'BASIC',
      paymentGateway: 'eSewa',
    });
    await transaction.save();
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

    if (paymentStatusCheck.status === 200) {
      // Update the transaction status
      transaction.status = paymentStatusCheck.data.status;
      await transaction.save();
      res
        .status(200)
        .json({ message: 'Transaction status updated successfully' });
    }
  } catch (error) {
    console.error('Error updating transaction status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { EsewaInitiatePayment, paymentStatus };

// 1. Made a initiatePaymentLink for esewa in the utils.

// Left to do
// 1. Verify the whole process from postman
// 2. If it works, let the admin handle the payment link sending process
// 3. Show the payment success process properly for both situations
