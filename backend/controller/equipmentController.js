const RecentActivity = require('../models/activitiesModal');
const Equipment = require('../models/equipmentModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.addEquipment = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body is missing',
    });
  }
  const equipment = await Equipment.create(req.body);
  res.status(200).json({ status: 'success', data: { data: equipment } });
});

exports.getAllEquipments = catchAsync(async (req, res, next) => {
  // 1A Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  // 1B Advanced Filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = JSON.parse(
    queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
  );

  let query = Equipment.find(queryStr);

  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort('-installationDate');
  }

  const equipments = await query;
  const count = await Equipment.countDocuments(req.query);
  res
    .status(200)
    .json({ status: 'success', data: { count, data: equipments } });
});

exports.getEquipment = catchAsync(async (req, res, next) => {
  const equipment = await Equipment.findOne({
    _id: req.params.id,
  });

  if (!equipment) {
    return next(new AppError(`No equipment found with that id`, 404));
  }

  res.status(200).json({ status: 'success', data: { data: equipment } });
});

exports.updateEquipment = catchAsync(async (req, res, next) => {
  const originalEquipment = await Equipment.findById(req.params.id);

  if (!originalEquipment) {
    return next(new AppError('No equipment found with that id', 404));
  }

  const updatedEquipment = await Equipment.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    // To run the validators before updating the field & return a updated data
    { new: true, runValidators: true },
  );
  if (!updatedEquipment) {
    return next(new AppError('No equipment found with that id', 404));
  }

  if (originalEquipment.status !== updatedEquipment.status) {
    // Log the activity in RecentActivity
    const activity = new RecentActivity({
      activist: req.user?.name,
      entity: updatedEquipment._id,
      description: `status changed to`,
      status: updatedEquipment.status,
    });

    await activity.save();
  }

  res.status(200).json({ status: 'success', data: { data: updatedEquipment } });
});

exports.deleteEquipment = catchAsync(async (req, res, next) => {
  const equipment = await Equipment.findOneAndDelete({
    _id: req.params.id,
  });

  if (!equipment) {
    return next(new AppError('No equipment found with that id', 404));
  }

  res.status(204).json({ status: 'success' });
});
