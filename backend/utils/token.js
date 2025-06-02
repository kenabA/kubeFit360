const jwt = require('jsonwebtoken');

const AppError = require('./appError');
const Email = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const setupCookie = async (user) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }
  return { token, cookieOptions };
};

const createAndSendToken = async (user, statusCode, res) => {
  const { token, cookieOptions } = await setupCookie(user);
  res.cookie('jwt', token, cookieOptions);

  res
    .status(statusCode)
    .json({ status: 'Success', token, data: { data: user } });
};

const createAndSendAndMailToken = async (user, statusCode, res, req) => {
  const { token, cookieOptions } = await setupCookie(user);
  try {
    const loginURL = `${process.env.PROD_URL}/post-payment-login?token=${token}`;
    await new Email(user, loginURL).sendWelcome();
  } catch {
    return new AppError(
      'There was an error sending the email. Try again later.',
      500,
    );
  }

  user.oneTimeLoginToken = token;
  user.oneTimeLoginTokenExpires = new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  );

  await user.save({ validateBeforeSave: false });

  res.cookie('jwt', token, cookieOptions);
  res
    .status(statusCode)
    .json({ status: 'Success', token, data: { data: user } });
};

module.exports = {
  createAndSendToken,
  createAndSendAndMailToken,
};
