const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const User = require('./../models/users.model');
const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');

exports.signup = catchAsync (async (req, res, next) => {

    // 1.  obtener el name y el password de la req.body    
    const { name, password } = req.body;

    // 2. generar el accountNumber de 6 digitos
    const accountNumber = Math.floor(Math.random() * 900000) + 100000;
    
    // 3. crear una variable amount con 1000
    let amount = 1000;
    
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // 4. crear el usuario con name accountNumber password y amount
    const user = await User.create({
      name: name.toLowerCase(),
      accountNumber,
      password: encryptedPassword,
      amount,
    });

    const token = await generateJWT(user.userid);

    // 5. enviar la respuesta al cliente
    res.status(201).json({
      message: 'The new user was created',
      user: {
        userid: user.userid,
        name: user.name,
        accountNumber: user.accountNumber,
        amount: user.amount,
      },
      token,
    });


});



exports.login = catchAsync (async (req, res, next) => {
 const { name, password } = req.body;

 const user = await User.findOne({
  where: {
    name,
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
    accountNumber: user.accountNumber,
    amount: user.amount,
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