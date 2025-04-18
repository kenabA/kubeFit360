const Notice = require('../models/noticesModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllNotices = catchAsync(async (req, res, next) => {
  const { search, status } = req.query;
  let query = Notice.find();

  if (search) {
    query = query.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
    });
  }

  const notices = await query.sort({ createdAt: -1 });
  const count = await query.clone().countDocuments();

  let enrichedNotices = notices.map((notice) => {
    const isExpired = new Date(notice.expiresAt) < new Date();
    return {
      ...notice._doc,
      status: isExpired ? 'expired' : 'active',
    };
  });

  if (status) {
    enrichedNotices = enrichedNotices.filter(
      (notice) => notice.status === status.toLowerCase(),
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      count,
      data: enrichedNotices,
    },
  });
});

exports.getNotice = catchAsync(async (req, res, next) => {
  const notice = await Notice.findOne({
    _id: req.params.id,
  });

  if (!notice) {
    return next(new AppError(`No notice found with that id`, 404));
  }

  res.status(200).json({ status: 'success', data: { data: notice } });
});

exports.addNotice = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body is missing',
    });
  }
  const notice = await Notice.create(req.body);
  res.status(200).json({ status: 'success', data: { data: notice } });
});

exports.updateNotice = catchAsync(async (req, res, next) => {
  const originalNotice = await Notice.findById(req.params.id);

  if (!originalNotice) {
    return next(new AppError('No equipment found with that id', 404));
  }

  if (req.body.removeImage) {
    req.body.representativeImg = '';
  }

  const updatedNotice = await Notice.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    // To run the validators before updating the field & return a updated data
    { new: true, runValidators: true },
  );
  if (!updatedNotice) {
    return next(new AppError('No notice found with that id', 404));
  }

  //   if (originalNotice.status !== updatedNotice.status) {
  // Log the activity in RecentActivity
  // const activity = new RecentActivity({
  //   activist: req.user?.name,
  //   entity: updatedNotice._id,
  //   description: `status changed to`,
  //   status: updatedNotice.status,
  // });

  // await activity.save();
  //   }

  res.status(200).json({ status: 'success', data: { data: updatedNotice } });
});

exports.deleteNotice = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError('Please provide the notice id', 400));
  }

  const notice = await Notice.findOneAndDelete({
    _id: req.params.id,
  });

  if (!notice) {
    return next(new AppError('No notice found with that id', 404));
  }

  res.status(204).json({ status: 'success' });
});

exports.deleteAllNotice = catchAsync(async (req, res, next) => {
  await Notice.deleteMany();
  res.status(204).json({
    status: 'success',
  });
});
