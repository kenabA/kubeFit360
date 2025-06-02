const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const equipmentRouter = require('./routes/equipmentRoutes');
const activitiesRouter = require('./routes/activitiesRoutes');
const workoutPlanReqRouter = require('./routes/workoutPlanReqRoutes');
const workoutPlanRouter = require('./routes/workoutPlanRoutes');
const workoutPlanTemplateRouter = require('./routes/workoutPlanTemplateRoutes');
const noticesRouter = require('./routes/noticesRoutes');
const weightsRouter = require('./routes/weightsRoutes');
const transactionsRouter = require('./routes/transactionsRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(
  cors({
    origin: 'https://kube-fit-360-plum.vercel.app',
    credentials: true,
  }),
);

app.options('*', cors());

console.log(process.env.NODE_ENV);

// Middleware to get detailed info about the request on the console of the backend server
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware to parse the incoming JSON to object
app.use(express.json());
app.use(cookieParser());

// Middleware to serve static files
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/equipments', equipmentRouter);
app.use('/api/v1/recentActivities', activitiesRouter);
app.use('/api/v1/workoutPlanRequests', workoutPlanReqRouter);
app.use('/api/v1/workoutPlan', workoutPlanRouter);
app.use('/api/v1/workoutPlanTemplate', workoutPlanTemplateRouter);
app.use('/api/v1/notices', noticesRouter);
app.use('/api/v1/transactions', transactionsRouter);
app.use('/api/v1/weights', weightsRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middle ware
app.use(globalErrorHandler);

module.exports = app;
