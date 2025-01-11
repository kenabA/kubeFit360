const express = require('express');
const morgan = require('morgan');
const maintainerRouter = require('./routes/maintainerRoutes');
const authRouter = require('./routes/authRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
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

const swaggerOptions = {
  swaggerDefinition: {
    myapi: '1.0.0',
    info: {
      title: 'kubeFit 360°',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware to parse the incoming JSON to object
app.use(express.json());

// Middleware to serve static files
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/maintainers', maintainerRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middle ware
app.use(globalErrorHandler);

module.exports = app;
