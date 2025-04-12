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

  const existingPlan = await WorkoutPlan.findOne().populate({
    path: 'request',
    match: { member: req.params.id },
  });

  if (existingPlan) {
    await WorkoutPlan.findByIdAndDelete(existingPlan._id);
  }

  const newPlan = await WorkoutPlan.create(req.body);

  console.log(newPlan);

  // MOST LIKELY HERE, THE ERROR IS HAPPENING
  await WorkoutPlanRequests.findByIdAndUpdate(req.body.request, {
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
  const plan = await WorkoutPlan.findOne().populate({
    path: 'request',
    match: { member: req.params.id },
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
