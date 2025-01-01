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

function handleValidationErrorDB(err) {
  /* If you want a single validation error message at a time
   const message = Object.values(err.errors)
     .map((err) => err.message)
     .reverse()[0]; */

  const message = Object.values(err.errors)
    .map((err) => err.message)
    .join('. ');

  return new AppError(message, 400);
}

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
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateValueDB(err);
    }
    if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(err);
    }
    sendErrorProd(error, res);
  }
};
