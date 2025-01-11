const { promisify } = require('util');
const User = require('../models/userModal');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const createAndSendToken = require('../utils/token');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  newUser.password = undefined;

  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide your email and password', 404));
  }

  // 2) Check if user exists on the database
  const user = await User.findOne({ email }).select('+password'); // + to select the field that is deselected on the schema

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 4) Send in the response
  user.password = undefined;

  createAndSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedOut', {
    expired: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }
  // 2) Generate random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to the user's email
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to : ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);

    return next(
      new AppError(
        'There was an error sending the email. Try again later.',
        500,
      ),
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetExpires: { $gt: Date.now() },
    passwordResetToken: hashedToken,
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired'));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({ status: 'success' });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting the token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }
  // 2) Verify token (Decodes the payload which is the id in this case)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('The user belonging to the token, no longer exists.', 401),
    );
  }

  // 4) Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401),
    );
  }

  req.user = currentUser;
  next();
});

exports.authenticateUser = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).json({ message: 'User must log in first' });
    }

    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET,
    );

    res.status(200).json({
      message: 'Authentication Success.',
      data: { user: decoded },
    });
  } catch {
    res.status(401).json({
      message: 'Authentication failed. Please log in again.',
    });
  }
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get user from the collection
  const currentUser = await User.findById(req.user.id).select('+password');

  if (
    !req.body.password ||
    !req.body.passwordConfirm ||
    !req.body.passwordCurrent
  ) {
    return next(new AppError('Please provide all the passwords first.'));
  }

  // 2. Check if the POSTed current password is correct
  const correctPassword = await currentUser.correctPassword(
    req.body.passwordCurrent,
    currentUser.password,
  );

  if (!correctPassword) {
    return next(new AppError('Current password does not match.', 401));
  }

  // 3. If so, update password
  currentUser.password = req.body.password;
  currentUser.passwordConfirm = req.body.passwordConfirm;
  await currentUser.save();

  // 4. Log user out and send response.
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};
