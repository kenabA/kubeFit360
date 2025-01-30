const RecentActivity = require('../models/activitiesModal');
const catchAsync = require('../utils/catchAsync');

exports.getAllRecentActivities = catchAsync(async (req, res, next) => {
  const recentActivites = await RecentActivity.find()
    .populate('entity') // This will fetch the full Equipment details
    .sort({ time: -1 }) // Sorting by latest first
    .limit(8); // Limiting results for efficiency

  const count = await RecentActivity.countDocuments();
  res
    .status(200)
    .json({ status: 'success', data: { count, data: recentActivites } });
});
