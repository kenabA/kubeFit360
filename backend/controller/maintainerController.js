const Maintainer = require('../models/maintainerModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllMaintainers = catchAsync(async (req, res, next) => {
  const maintainers = await Maintainer.find();
  res.status(201).json({ status: 'success', data: { maintainers } });
});

exports.getMaintainer = catchAsync(async (req, res, next) => {
  const maintainer = await Maintainer.findById(req.params.id);
  if (!maintainer) {
    return next(new AppError('No maintainer found with that id', 404));
  }
  res.status(201).json({ status: 'success', data: { maintainer } });
});

exports.addMaintainer = catchAsync(async (req, res, next) => {
  const newMaintainer = await Maintainer.create(req.body);
  res.status(201).json({ status: 'success', data: { newMaintainer } });
});

exports.updateMaintainer = catchAsync(async (req, res, next) => {
  const updatedMaintainer = await Maintainer.findByIdAndUpdate(
    req.params.id,
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
  const maintainer = await Maintainer.findByIdAndDelete(req.params.id);

  if (!maintainer) {
    return next(new AppError('No maintainer found with that id', 404));
  }

  res.status(204).json({ status: 'success' });
});
