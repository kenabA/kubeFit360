const User = require('../models/userModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObj');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { role } = req.query;
  const query = role ? { role } : {};
  const users = await User.find(query);
  const count = await User.countDocuments(query);

  res.status(201).json({ status: 'success', data: { count, users } });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    _id: req.params.id,
  });

  if (!user) {
    return next(new AppError(`No user found with that id`, 404));
  }
  res.status(201).json({ status: 'success', data: { user } });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates.', 400));
  }
  // Won't let fields, that should not be updated to change
  const filteredBody = filterObj(req.body, [
    'name',
    'phoneNumber',
    'birthDate',
    'gender',
    'status',
    'address',
  ]);

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: 'success', data: { user: updatedUser } });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const udpatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    // To run the validators before updating the field & return a updated data
    { new: true, runValidators: true },
  );
  if (!udpatedUser) {
    return next(new AppError('No user found with that id', 404));
  }

  res.status(201).json({ status: 'success', data: { user: udpatedUser } });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndDelete({
    _id: req.params.id,
  });

  if (!user) {
    return next(new AppError('No user found with that id', 404));
  }

  res.status(204).json({ status: 'success' });
});
