const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const transfersRouter = require('./routes/transfers.routes');
const authRouter = require('./routes/auth.routes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/transfers', transfersRouter);

app.all('*', (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
