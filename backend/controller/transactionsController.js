const Transaction = require('../models/transactionModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const queryWithFilter = new APIFeatures(
    Transaction.find().populate('user').sort({ createdAt: -1 }),
    req.query,
  ).filter();

  const count = await Transaction.countDocuments(queryWithFilter.query);

  const finalQuery = queryWithFilter.sort().paginate().query;

  const transactions = await finalQuery;

  res
    .status(200)
    .json({ status: 'success', data: { count, data: transactions } });
});

exports.deleteAllTransactions = catchAsync(async (req, res, next) => {
  await Transaction.deleteMany();
  res.status(204).json({
    status: 'success',
  });
});
