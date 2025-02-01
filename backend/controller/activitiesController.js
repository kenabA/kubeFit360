const RecentActivity = require('../models/activitiesModal');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllRecentActivities = catchAsync(async (req, res, next) => {
  const queryWithFilter = new APIFeatures(
    RecentActivity.find(),
    req.query,
  ).filter();

  const count = await RecentActivity.countDocuments(queryWithFilter.query);
  const finalQuery = queryWithFilter.sort().paginate().query;

  const recentActivites = await finalQuery.populate('entity');

  res
    .status(200)
    .json({ status: 'success', data: { count, data: recentActivites } });
});
