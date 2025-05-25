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

exports.getAggregatedTransactions = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.aggregate([
    {
      $group: {
        _id: '$planType',
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({ status: 'success', data: transactions });
});

exports.deleteAllTransactions = catchAsync(async (req, res, next) => {
  await Transaction.deleteMany();
  res.status(204).json({
    status: 'success',
  });
});

exports.getLast6MonthsRevenue = async (req, res) => {
  try {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const revenueData = await Transaction.aggregate([
      {
        $match: {
          status: 'COMPLETE',
          paidAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$paidAt' },
            month: { $month: '$paidAt' },
          },
          totalRevenue: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
        },
      },
    ]);

    // Optional: Format output for easier frontend use
    const formatted = revenueData.map((item) => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      totalRevenue: item.totalRevenue,
    }));

    res.status(200).json({
      status: 'success',
      data: { data: formatted },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'fail',
      message: 'Could not calculate revenue',
      error: err.message,
    });
  }
};
