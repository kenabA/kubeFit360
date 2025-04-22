const WorkoutPlan = require('../models/workoutPlanModal');
const WorkoutPlanRequests = require('../models/workoutPlanReqModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// exports.createWorkoutPlan = catchAsync(async (req, res, next) => {
//   if (!req.body || Object.keys(req.body).length === 0) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Request body is missing',
//     });
//   }

//   const existingPlan = await WorkoutPlan.findOne().populate({
//     path: 'request',
//     match: { member: req.body.request },
//   });

//   if (existingPlan) {
//     // check maile kun id pathairao ux
//     console.log('There exists a plan for this member, deleting it');
//     await WorkoutPlan.findByIdAndDelete(existingPlan._id);
//   }

//   const newPlan = await WorkoutPlan.create(req.body);

//   // MOST LIKELY HERE, THE ERROR IS HAPPENING
//   await WorkoutPlanRequests.findByIdAndUpdate(req.body.request, {
//     status: 'generated',
//     generatedPlan: newPlan._id,
//   });

//   res.status(201).json({
//     status: 'success',
//     data: { data: newPlan },
//   });
// });
exports.createWorkoutPlan = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body is missing',
    });
  }

  const memberId = req.body.member;
  const requestId = req.body.request;

  // PROBLEM HERE

  // Delete any existing plan for this member
  await WorkoutPlan.findOneAndDelete({ member: memberId });

  // Create new plan
  const newPlan = await WorkoutPlan.create(req.body);

  // Update the request to link this new plan
  await WorkoutPlanRequests.findByIdAndUpdate(requestId, {
    status: 'generated',
    generatedPlan: newPlan._id,
  });

  res.status(201).json({
    status: 'success',
    data: { data: newPlan },
  });
});
// exports.createWorkoutPlan = catchAsync(async (req, res, next) => {
//   if (!req.body || Object.keys(req.body).length === 0) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Request body is missing',
//     });
//   }

//   const memberId = req.body.member;
//   const requestId = req.body.request;

//   const existingPlan = await WorkoutPlanRequests.findOne({
//     member: memberId,
//     generatedPlan: { $ne: null },
//   });

//   console.log(existingPlan);
//   console.log('first');

//   if (existingPlan) {
//     await WorkoutPlan.findOneAndDelete({ member: memberId });
//   }
//   console.log('second');

//   // Step 3: Create new plan
//   const newPlan = await WorkoutPlan.create(req.body);

//   console.log('third');
//   // Step 4: Update the current request to link this new plan
//   await WorkoutPlanRequests.findByIdAndUpdate(requestId, {
//     status: 'generated',
//     generatedPlan: newPlan._id,
//   });

//   res.status(201).json({
//     status: 'success',
//     data: { data: newPlan },
//   });
// });

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

  // Step 1: Find the latest request that has a generatedPlan linked
  const request = await WorkoutPlanRequests.findOne({
    member: memberId,
    generatedPlan: { $ne: null }, // only get if there's a linked plan
  }).sort({ createdAt: -1 }); // Optional: get the latest one

  if (!request) {
    return res
      .status(404)
      .json({ message: 'No valid workout request found for this member.' });
  }

  // Step 2: Use that request ID to find the linked workout plan
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

// trying to delete the previous workout plan request that was deleted

// now the workout plan showed up

// possible reason.

// first i send in the id of the client to the workout request table
// it did not show up
// the old request did not have data either
// i then created a new request
// it still did not show up
// deleted the old request
// then the new request showed up in the member field

// then i again created a new request
// created the workout plan
// deleted the old workout plan
// tried to view the new workout plan
// it did not show up

// each time i try to load the workout plan, i think the old request or plan is being used

// 6805e2a61be1556053f27383 this is the old request id
// 6805e2a61be1556053f27383 this is the request id sent while opening the workout plan that means even after creating a new workout plan, when requesting for the workout plan, the old request is being used. the problem is that i think the member id is sent and it tries to find the workout request which might be old

// NOW NEW PROBLEM HAS ARRIVED
// WHEN I HAVE A WORKOUT PLAN FOR A USER AND CREATE ANOTHER WORKOUT PLAN FOR ANOTHER USER, THE WORKOUT PLAN FOR THE OTHER USER IS GETTING DELETED
