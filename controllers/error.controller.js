const AppError = require('./../utils/appError');

const handleCastError22P02 = () => {
  return new AppError(
    'Some type off data send does not match was expected',
    400
  );
};

const handleJWTExpiredError = () => {
  new AppError('Your token has expired, please login again!', 401);
};

const handleJWTError = () => {
  new AppError('Invalid token, please login again!', 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
const sendErrorProd = (err, res) => {
  // operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // programing or other unknown error: don't leak error details
    // console.error('Error ☠', err)
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statsCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    let error = err;
    console.log(error.parent?.code);

    if (error.parent?.code === '22P02') error = handleCastError22P02();
    if (error.name === 'tokenExpiredError') error = handleJWTExpiredError();
    if (error.name === 'JsonWebTokenError') error = handleJWTError();

    // console.log(error.name);

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
