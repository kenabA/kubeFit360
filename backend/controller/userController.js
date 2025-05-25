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

const Transaction = require('../models/transactionModel');
const Email = require('./../utils/email');

exports.getClientStats = catchAsync(async (req, res, next) => {
  const stats = await User.aggregate([
    {
      // Match only documents where the discriminator key equals 'Client'
      $match: { __t: 'Client', role: 'member' },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        active: {
          $sum: { $cond: [{ $eq: ['$active', true] }, 1, 0] },
        },
        inactive: {
          $sum: { $cond: [{ $eq: ['$active', false] }, 1, 0] },
        },
        basic: {
          $sum: { $cond: [{ $eq: ['$membershipType', 'basic'] }, 1, 0] },
        },
        enterprise: {
          $sum: { $cond: [{ $eq: ['$membershipType', 'enterprise'] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
        active: 1,
        inactive: 1,
        basic: 1,
        enterprise: 1,
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
    let queryWithFilter;
    if (role === 'member') {
      queryWithFilter = new APIFeatures(
        User.find({
          role: role,
          active: { $in: [true, false] },
          status: 'active',
        }),
        req.query,
      ).filter();
    } else {
      queryWithFilter = new APIFeatures(
        User.find({ role: role }),
        req.query,
      ).filter();
    }

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

  await new Email(newUser).sendWelcomeStaff();

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

    try {
      await new Email(client, paymentUrl).sendClientApproval();
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
    try {
      await new Email(client).sendClientRejection();
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

exports.getClientDashboardStats = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  if (!userId) {
    return next(new AppError('No client found with that ID', 404));
  }

  const transaction = await Transaction.findOne({ user: userId })
    .sort({ paidAt: -1 })
    .exec();

  if (!transaction) {
    return next(
      new AppError('No transaction found with that Transaction ID', 404),
    );
  }

  const paidAt = new Date(transaction.paidAt);
  const expiresOn = new Date(transaction.expiresOn);
  const now = new Date();

  const totalDays = Math.ceil(
    (new Date(expiresOn) - new Date(paidAt)) / (1000 * 60 * 60 * 24),
  );

  console.log('Total days: ', totalDays);
  const daysCompleted = Math.max(
    0,
    Math.floor((now - new Date(paidAt)) / (1000 * 60 * 60 * 24)),
  );
  const daysLeft = Math.max(0, totalDays - daysCompleted);

  res.status(200).json({
    status: 'success',
    data: {
      totalDays,
      daysLeft,
      daysCompleted,
      planType: transaction.planType,
      paidAt: transaction.paidAt,
      expiresOn: transaction.expiresOn,
      transactionId: transaction.transaction_uuid,
      amount: transaction.amount,
    },
  });
});

exports.extendMembership = catchAsync(async (req, res, next) => {
  const clientIdFromParams = req.params.id;
  const { membershipType } = req.body;

  const client = await Client.findById(clientIdFromParams);
  if (!client) {
    return res.status(404).json({
      status: 'fail',
      message: 'No client found with that ID',
    });
  }

  if (!membershipType) {
    return res.status(400).json({
      status: 'fail',
      message: 'No Membership Type Submitted',
    });
  }

  if (!['basic', 'enterprise'].includes(membershipType)) {
    return res.status(400).json({
      status: 'fail',
      message: "Decision must be either 'basic' or 'enterprise'",
    });
  }

  if (
    client.active &&
    membershipType === 'basic' &&
    client.membershipType === 'enterprise'
  ) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Downgrades to Basic can only be made after your current plan expires.',
    });
  }

  const paymentUrl = await initiateEsewaPaymentInternal({
    user_id: clientIdFromParams,
    membershipType: membershipType,
    transaction_uuid: generateUniqueId(),
  });

  try {
    await new Email(client, paymentUrl).sendPayment();
  } catch {
    return next(
      new AppError(
        'There was an error sending the email. Try again later.',
        500,
      ),
    );
  }

  res.status(200).json({
    status: 'success',
    message: `Payment link has been sent to your email successfully.`,
  });
});

exports.getUsersCountByRole = catchAsync(async (req, res, next) => {
  try {
    const counts = await User.aggregate([
      {
        $group: {
          _id: '$role',
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          role: '$_id',
          total: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: { data: counts },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});
