const Client = require('../models/clientModal');
const User = require('../models/userModal');
const APIFeatures = require('../utils/APIFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObj');
const { generateUniqueId } = require('esewajs');

const {
  initiateEsewaPaymentInternal,
} = require('../utils/initiateEsewaPayment');
const sendEmail = require('./../utils/email');

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
    const queryWithFilter = new APIFeatures(
      User.find({ role: role }),
      req.query,
    ).filter();

    const count = await User.countDocuments(queryWithFilter.query);

    const finalQuery = queryWithFilter.sort().paginate().query;

    const users = await finalQuery;

    res.status(200).json({
      status: 'success',
      data: { count, data: users },
    });
  });

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.checkNewUser = (req, res, next) => {
  res.status(200).json({
    passwordSet: !!req.user.password,
  });
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    _id: req.params.id,
  });

  if (!user) {
    return next(new AppError(`No user found with that id`, 404));
  }
  res.status(201).json({ status: 'success', data: { data: user } });
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
  if (req.body.removeImage) {
    req.body.userImage = '';
  }

  const udpatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    // To run the validators before updating the field & return a updated data
    { new: true, runValidators: true },
  );
  if (!udpatedUser) {
    return next(new AppError('No user found with that id', 404));
  }

  res.status(201).json({ status: 'success', data: { data: udpatedUser } });
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

exports.getAllClients = () =>
  catchAsync(async (req, res, next) => {
    const queryWithFilter = new APIFeatures(Client.find(), req.query).filter();

    const count = await Client.countDocuments(queryWithFilter.query);

    const finalQuery = queryWithFilter.sort().paginate().query;

    const clients = await finalQuery;

    res.status(200).json({
      status: 'success',
      data: { count, data: clients },
    });
  });

exports.processClientRequest = catchAsync(async (req, res, next) => {
  const clientIdFromParams = req.params.id;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({
      status: 'fail',
      message: "Decision must be either 'approved' or 'rejected'",
    });
  }

  const client = await Client.findById(clientIdFromParams);
  if (!client) {
    return res.status(404).json({
      status: 'fail',
      message: 'No client found with that ID',
    });
  }
  if (!client.status || client.status !== 'pending') {
    return res.status(400).json({
      status: 'fail',
      message: 'This client request has already been processed',
    });
  }

  if (status === 'approved') {
    client.status = 'approved';
    const paymentUrl = await initiateEsewaPaymentInternal({
      user_id: client._id,
      membershipType: client.membershipType,
      transaction_uuid: generateUniqueId(),
    });

    const message = `Congratulations! Your membership request has been approved.\n\nPlease complete the payment using the link below:\n${paymentUrl}\n`;
    try {
      await sendEmail({
        email: client.email,
        subject: 'Membership Request Approved!',
        message,
      });
    } catch {
      return next(
        new AppError(
          'There was an error sending the email. Try again later.',
          500,
        ),
      );
    }
  } else if (status === 'rejected') {
    client.status = 'rejected';
    const message = `We are sorry to inform you that your membership request has been rejected. If you have any questions, please contact us.`;
    try {
      await sendEmail({
        email: client.email,
        subject: 'Membership Request Rejected!',
        message,
      });
    } catch {
      return next(
        new AppError(
          'There was an error sending the email. Try again later.',
          500,
        ),
      );
    }
  }
  await client.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: `Client request has been ${status} successfully`,
    data: { data: client },
  });
});
