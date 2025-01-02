const jwt = require('jsonwebtoken');
const Maintainer = require('../models/maintainerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await Maintainer.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({ status: 'success', token, data: { user: newUser } });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide your email and password', 404));
  }

  // 2) Check if user exists on the database
  const maintainer = await Maintainer.findOne({ email }).select('+password'); // + to select the field that is deselected on the schema
  console.log(await maintainer.correctPassword(password, maintainer.password));
  if (
    !maintainer ||
    !(await maintainer.correctPassword(password, maintainer.password))
  ) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) Create Token incase everything is correct
  const token = signToken(maintainer._id);

  // 4) Send in the response
  res.status(200).json({ status: 'success', token, data: { user: {} } });
});
