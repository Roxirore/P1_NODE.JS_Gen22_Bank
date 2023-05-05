const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const User = require('./../models/users.model');
const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');

exports.signup = catchAsync (async (req, res, next) => {

        
    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.toLowerCase(),
      email: name.toLowerCase(),
      password: encryptedPassword,
      role: name.toLowerCase(),
    });

    const token = await generateJWT(user.userid);

    res.status(201).json({
      message: 'The new user was created',
      user: {
        userid: user.userid,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });


});


exports.login = catchAsync (async (req, res, next) => {
 const { email, password } = req.body;

 const user = await User.findOne({
  where: {
    email,
    status: 'available',
  },
 })

 if (!user) {
  return next(new AppError('The user could not be found', 404))
 }

 if (!(await bcrypt.compare(password, user.password))) {
  return next(new AppError('The email or password is not correct', 401))
 }

 const token = await generateJWT(user.userid)

 res.status(200).json({
  status: 'Success',
  user: {
    userid: user.userid,
    name: user.name,
    email: user.email,
    role: user.role,
  },
  token,
});
});

exports.updatedPassword = catchAsync (async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  if (!(await bcrypt.compare(currentPassword, user.passsword))) {
    return next(new AppError('Incorrect password', 401))
  }

  const salt = await bcrypt.genSalt(10);

  const encryptedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encryptedPassword,
    passwordChangedAt: new Date(),
  });

  return res.status(200).json({
    status: 'success',
    message: 'The user password was changed successfully!'
  });
});

exports.renew = catchAync (async (req, res, next) => {
  const { sessionUser } = req;

  const token = await generateJWT(sessionUser.userid);

  return res.status(200).json({
    status: 'success',
    token,
    user: {
      userid: sessionUser.userid,
      name: sessionUser.name,
      email: sessionUser.email,
      role: sessionUser.role,
    },
  });
});