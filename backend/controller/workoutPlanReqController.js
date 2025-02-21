const WorkoutPlanRequests = require('../models/workoutPlanReqModal');
const APIFeatures = require('../utils/APIFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createWorkoutPlanRequests = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body is missing',
    });
  }
  const newUser = await WorkoutPlanRequests.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { data: newUser },
  });
});

exports.deleteAllWorkoutPlanRequests = catchAsync(async (req, res, next) => {
  await WorkoutPlanRequests.deleteMany();
  res.status(204).json({
    status: 'success',
  });
});

exports.getAllWorkoutPlanRequests = catchAsync(async (req, res, next) => {
  const queryWithFilter = new APIFeatures(
    WorkoutPlanRequests.find().populate('member').populate('trainer'),
    req.query,
  ).filter();

  const count = await WorkoutPlanRequests.countDocuments(queryWithFilter.query);

  const finalQuery = queryWithFilter.paginate().query;

  const workoutPlanRequests = await finalQuery.sort('-createdAt');

  res
    .status(200)
    .json({ status: 'success', data: { count, data: workoutPlanRequests } });
});

exports.getWorkoutPlanRequest = catchAsync(async (req, res, next) => {
  const plan = await WorkoutPlanRequests.findOne({
    _id: req.params.id,
  })
    .populate('member')
    .populate('trainer');

  if (!plan) {
    return next(new AppError(`No plan found with that id`, 404));
  }

  res.status(200).json({ status: 'success', data: { data: plan } });
});

exports.updateWorkoutPlanRequest = catchAsync(async (req, res, next) => {
  const workoutPlanRequest = await WorkoutPlanRequests.findById(req.params.id);

  if (!workoutPlanRequest) {
    return next(new AppError('No plan found with that id', 404));
  }

  const updatedPlanRequest = await WorkoutPlanRequests.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    // To run the validators before updating the field & return a updated data
    { new: true, runValidators: true },
  );
  if (!updatedPlanRequest) {
    return next(new AppError('No equipment found with that id', 404));
  }

  res
    .status(200)
    .json({ status: 'success', data: { data: updatedPlanRequest } });
});
