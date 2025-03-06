const WorkoutPlan = require('../models/workoutPlanModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createWorkoutPlan = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body is missing',
    });
  }
  const newUser = await WorkoutPlan.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { data: newUser },
  });
});

exports.getWorkoutPlan = catchAsync(async (req, res, next) => {
  const plan = await WorkoutPlan.findOne({
    _id: req.params.id,
  }).populate({
    path: 'request',
    populate: [{ path: 'member' }, { path: 'trainer' }],
  });

  if (!plan) {
    return next(new AppError(`No plan found with that id`, 404));
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

exports.deleteAllWorkoutPlan = catchAsync(async (req, res, next) => {
  await WorkoutPlan.deleteMany();
  res.status(204).json({
    status: 'success',
  });
});
