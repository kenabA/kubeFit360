const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.options('*', cors());

// Middleware to get detailed info about the request on the console of the backend server
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware to parse the incoming JSON to object
app.use(express.json());

// Middleware to serve static files
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middle ware
app.use(globalErrorHandler);

module.exports = app;
