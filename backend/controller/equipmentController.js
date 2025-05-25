const RecentActivity = require('../models/activitiesModal');
const Equipment = require('../models/equipmentModal');
const APIFeatures = require('../utils/APIFeatures');
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
  const queryWithFilter = new APIFeatures(
    Equipment.find({
      status: { $ne: 'recommended' },
    }),
    req.query,
  ).filter();

  const count = await Equipment.countDocuments(queryWithFilter.query);

  const finalQuery = queryWithFilter.sort().paginate().query;

  const equipments = await finalQuery;

  res
    .status(200)
    .json({ status: 'success', data: { count, data: equipments } });
});

exports.getAllRecommendedEquipments = catchAsync(async (req, res, next) => {
  const queryWithFilter = new APIFeatures(
    Equipment.find({
      status: 'recommended',
    }),
    req.query,
  ).filter();

  const count = await Equipment.countDocuments(queryWithFilter.query);

  const finalQuery = queryWithFilter.sort().paginate().query;

  const equipments = await finalQuery;

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

  if (req.body.removeImage) {
    req.body.equipmentImage = '';
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

exports.getEquipmentStats = catchAsync(async (req, res, next) => {
  const stats = await Equipment.aggregate([
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
        underMaintenance: {
          $sum: { $cond: [{ $eq: ['$status', 'underMaintenance'] }, 1, 0] },
        },
      },
    },
    // Justifies how the output should look. 0 for hide, 1 for show
    {
      $project: {
        _id: 0,
        total: 1,
        active: 1,
        inactive: 1,
        underMaintenance: 1,
      },
    },
  ]);

  res.status(200).json({ status: 'success', data: { data: stats } });
});
