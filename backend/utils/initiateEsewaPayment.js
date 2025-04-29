const { EsewaPaymentGateway } = require('esewajs');
const Transaction = require('../models/transactionModel');

exports.initiateEsewaPaymentInternal = async ({
  user_id,
  membershipType,
  transaction_uuid,
}) => {
  const amount = membershipType === 'basic' ? 1500 : 6000;
  const reqPayment = await EsewaPaymentGateway(
    amount,
    0,
    0,
    0,
    transaction_uuid,
    process.env.MERCHANT_ID,
    process.env.SECRET,
    process.env.SUCCESS_URL,
    process.env.FAILURE_URL,
    process.env.ESEWAPAYMENT_URL,
    undefined,
    undefined,
  );

  if (!reqPayment || reqPayment.status !== 200) {
    throw new Error('Error initiating payment with eSewa');
  }

  await Transaction.create({
    user: user_id,
    transaction_uuid: transaction_uuid,
    amount: amount,
    planType: amount <= 1500 ? 'basic' : 'enterprise',
    paymentGateway: 'eSewa',
  });

  return reqPayment.request.res.responseUrl;
};
