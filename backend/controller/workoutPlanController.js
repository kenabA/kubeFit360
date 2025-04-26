const WorkoutPlan = require('../models/workoutPlanModal');
const WorkoutPlanRequests = require('../models/workoutPlanReqModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createWorkoutPlan = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body is missing',
    });
  }

  const memberId = req.body.member;
  const requestId = req.body.request;

  await WorkoutPlan.findOneAndDelete({ member: memberId });

  const newPlan = await WorkoutPlan.create(req.body);

  await WorkoutPlanRequests.findByIdAndUpdate(requestId, {
    status: 'generated',
    generatedPlan: newPlan._id,
  });

  res.status(201).json({
    status: 'success',
    data: { data: newPlan },
  });
});

exports.getWorkoutPlan = catchAsync(async (req, res, next) => {
  const plan = await WorkoutPlan.findById({ _id: req.params.id }).populate({
    path: 'request',
    populate: [{ path: 'member' }, { path: 'trainer' }],
  });

  if (!plan) {
    return next(new AppError(`No plan found with that id`, 404));
  }

  res.status(200).json({ status: 'success', data: { data: plan } });
});

exports.getWorkoutPlanByMemberId = catchAsync(async (req, res, next) => {
  const memberId = req.params.id;

  const request = await WorkoutPlanRequests.findOne({
    member: memberId,
    generatedPlan: { $ne: null },
  }).sort({ createdAt: -1 });

  if (!request) {
    return res
      .status(404)
      .json({ message: 'No valid workout request found for this member.' });
  }

  const plan = await WorkoutPlan.findOne({
    request: request._id,
  }).populate({
    path: 'request',
    populate: ['member', 'trainer'],
  });

  if (!plan) {
    return res
      .status(404)
      .json({ message: 'Workout plan not found for the latest request.' });
  }

  res.status(200).json({ status: 'success', data: { data: plan } });
});

exports.getAllWorkoutPlan = catchAsync(async (req, res, next) => {
  const plan = await WorkoutPlan.find().populate({
    path: 'request',
    populate: [{ path: 'member' }, { path: 'trainer' }],
  });

  if (!plan) {
    return next(new AppError(`No plan found with that id`, 404));
  }

  res.status(200).json({ status: 'success', data: { data: plan } });
});

exports.deleteWorkoutPlan = catchAsync(async (req, res, next) => {
  const workoutPlan = await WorkoutPlan.findOneAndDelete({
    _id: req.params.id,
  });

  if (!workoutPlan) {
    return next(new AppError('No workout plan found with that id', 404));
  }

  res.status(204).json({ status: 'success' });
});

exports.deleteAllWorkoutPlan = catchAsync(async (req, res, next) => {
  await WorkoutPlan.deleteMany();
  res.status(204).json({
    status: 'success',
  });
});

exports.getMonthlyStatsByTrainer = catchAsync(async (req, res, next) => {
  const trainerId = req.user._id;

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);

  const plans = await WorkoutPlan.aggregate([
    {
      $lookup: {
        from: 'workoutplanrequests',
        localField: 'request',
        foreignField: '_id',
        as: 'requestInfo',
      },
    },
    { $unwind: '$requestInfo' },
    {
      $match: {
        'requestInfo.trainer': trainerId,
        createdAt: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: { date: '$createdAt' } },
          month: { $month: { date: '$createdAt' } },
        },
        plansCreated: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 },
    },
  ]);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const currentMonth = new Date().getMonth();

  const data = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(currentMonth - i);
    const month = date.getMonth();
    const year = date.getFullYear();

    const entry = plans.find(
      (p) => p._id.month === month + 1 && p._id.year === year,
    );

    data.push({
      month: monthNames[month],
      year,
      plansCreated: entry ? entry.plansCreated : 0,
    });
  }

  res.status(200).json({
    status: 'success',
    data: { data },
  });
});
