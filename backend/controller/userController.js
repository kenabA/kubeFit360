const User = require('../models/userModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObj');

exports.getClientStats = catchAsync(async (req, res, next) => {
  const stats = await User.aggregate([
    {
      $match: { role: 'member' },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        active: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] },
        },
        inactive: {
          $sum: { $cond: [{ $eq: ['$status', 'inactive'] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
        active: 1,
        inactive: 1,
      },
    },
  ]);

  res.status(200).json({ status: 'success', data: { data: stats } });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  const count = await User.countDocuments();
  res.status(200).json({ status: 'success', data: { count, users } });
});

exports.getUsersByRole = (role) =>
  catchAsync(async (req, res, next) => {
    const users = await User.find({ role: role });

    if (!users || users.length === 0) {
      return next(new AppError(`No users found with role: ${role}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: { count: users.length, data: users },
    });
  });

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

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

exports.addUser = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body is missing',
    });
  }
  const newUser = await User.create(req.body);
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { data: newUser },
  });
});
