const WorkoutPlanTemplate = require('../models/workoutPlanTemplateModal');
const catchAsync = require('../utils/catchAsync');

exports.getAllWorkoutPlanTemplates = catchAsync(async (req, res, next) => {
  const workoutPlanTemplates =
    await WorkoutPlanTemplate.find().sort('-createdAt');
  const count = await WorkoutPlanTemplate.countDocuments();

  res
    .status(200)
    .json({ status: 'success', data: { count, data: workoutPlanTemplates } });
});

exports.createWorkoutPlanTemplate = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body is missing',
    });
  }
  const newUser = await WorkoutPlanTemplate.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { data: newUser },
  });
});

exports.deleteAllWorkoutPlanTemplate = catchAsync(async (req, res, next) => {
  await WorkoutPlanTemplate.deleteMany();
  res.status(204).json({
    status: 'success',
  });
});
