const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateValueDB = (err) => {
  const fieldName = Object.keys(err?.keyValue)[0];
  const message = `Duplicate Value: '${fieldName}' already exists.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  /* If you want a single validation error message at a time
   const message = Object.values(err.errors)
     .map((err) => err.message)
     .reverse()[0]; */

  const message = Object.values(err.errors)
    .map((err) => err.message)
    .join('. ');

  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError('Invalid Token. Please log in again.', 401);
};

const handleTokenExpiredError = () => {
  return new AppError('User session expired. Please log in again.', 401);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown error: don't leak error details
  } else {
    res
      .status(500)
      .json({ status: 'error', message: 'Something went very wrong' });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    if (err.name === 'JsonWebTokenError') {
      err = handleJWTError(err);
    }
    if (err.name === 'TokenExpiredError') {
      err = handleTokenExpiredError();
    }

    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') {
      err = handleCastErrorDB(err);
    }
    if (err.code === 11000) {
      err = handleDuplicateValueDB(err);
    }
    if (err.name === 'ValidationError') {
      err = handleValidationErrorDB(err);
    }
    if (err.name === 'JsonWebTokenError') {
      err = handleJWTError();
    }
    if (err.name === 'TokenExpiredError') {
      err = handleTokenExpiredError();
    }
    sendErrorProd(err, res);
  }
};
