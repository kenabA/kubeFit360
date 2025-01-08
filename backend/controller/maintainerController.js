const User = require('../models/userModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllMaintainers = catchAsync(async (req, res, next) => {
  const maintainers = await User.find({ role: 'maintainer' });
  res.status(201).json({ status: 'success', data: { maintainers } });
});

exports.getMaintainer = catchAsync(async (req, res, next) => {
  const maintainer = await User.findOne({
    role: 'maintainer',
    _id: req.params.id,
  });
  console.log('first');
  if (!maintainer) {
    return next(new AppError('No maintainer found with that id', 404));
  }
  res.status(201).json({ status: 'success', data: { maintainer } });
});

exports.addMaintainer = catchAsync(async (req, res, next) => {
  const newMaintainer = await User.create(req.body);
  newMaintainer.password = undefined;
  res.status(201).json({ status: 'success', data: { newMaintainer } });
});

exports.updateMaintainer = catchAsync(async (req, res, next) => {
  const updatedMaintainer = await User.findOneAndUpdate(
    { _id: req.params.id, role: 'maintainer' },
    req.body,
    // To run the validators before updating the field & return a updated data
    { new: true, runValidators: true },
  );
  if (!updatedMaintainer) {
    return next(new AppError('No maintainer found with that id', 404));
  }

  res.status(201).json({ status: 'success', data: { updatedMaintainer } });
});

exports.deleteMaintainer = catchAsync(async (req, res, next) => {
  const maintainer = await User.findOneAndDelete({
    _id: req.params.id,
    role: 'maintainer',
  });

  if (!maintainer) {
    return next(new AppError('No maintainer found with that id', 404));
  }

  res.status(204).json({ status: 'success' });
});
