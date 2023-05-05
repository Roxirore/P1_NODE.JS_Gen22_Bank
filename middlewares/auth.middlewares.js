// aqui estan todos los middlewares referentes a la autenticacion

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/users.model');

exports.protect = catchAsync(async (req, res, next) => {
  // 1. extraer el token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // obtener la cadena despues de Bearer y asignarla a token
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. valiadr si existe el token
  if (!token) {
    return next(
      new AppError('You are not logged in! please log in to get access', 401)
    );
  }
  console.log(token);

  // 3. decodificar el jwt
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );
  //    console.log(decoded);

  // 4. buscar el usuario y validar si existe
  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError('The ownwr of this token is not available', 401));
  }

  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError('User recently changed password, please login again', 401)
      );
    }
  }
  const sessionUser = user;
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  // validar el usuario dueño del la req.params y validar el usuario en sesion
  const { user, sessionUser } = req;

  if (user.userid !== sessionUser.userid) {
    return next(new AppError('You are not the owmner account', 401));
  }
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perform this action!', 403)
      );
    }
    next();
  };
};
