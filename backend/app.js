const express = require('express');
const morgan = require('morgan');
const maintainerRouter = require('./routes/maintainerRoutes');

const app = express();

// Middleware to get detailed info about the request on the console of the backend server
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Middleware to parse the incoming JSON to object
app.use(express.json());
// Middleware to serve static files
app.use(express.static(`${__dirname}/public`));

const ok = 1;
// eslint make it work!!!
app.use('/api/v1/maintainers', maintainerRouter);

module.exports = app;
