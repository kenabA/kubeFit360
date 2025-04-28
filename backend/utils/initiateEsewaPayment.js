const { EsewaPaymentGateway } = require('esewajs');

exports.initiateEsewaPaymentInternal = async ({ amount, transaction_uuid }) => {
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

  return reqPayment.request.res.responseUrl;
};
