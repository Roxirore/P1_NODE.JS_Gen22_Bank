const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUsers = catchAsync((req, res, next) => {
  const { name, accountNumber, password, amount, status } = req.body;
  if (!name) {
    return res.status(400).json({
      status: 'error',
      message: 'the name is required',
    });
  }

  if (!accountNumber) {
    return res.status(400).json({
      status: 'error',
      message: 'the accountNumber is required',
    });
  }

  if (!password) {
    return res.status(400).json({
      status: 'error',
      message: 'the password is required',
    });
  }

  if (!amount) {
    return res.status(400).json({
      status: 'error',
      message: 'the amount is required',
    });
  }

  if (!status) {
    return res.status(400).json({
      status: 'error',
      message: 'the status is required',
    });
  }

  next();
});

exports.validExistUser = catchAsync(async (req, res, next) => {
  // try {

  const { userid } = req.params;

  const user = await User.findOne({
    where: {
      userid,
    },
  });

  if (!user) {
    return next(new AppError('User nor found', 404));
  }

  req.user = user;
  next();
});
