const express = require('express');

const validationMiddleware = require('../middlewares/validations.middlewares');
const authMiddleware = require('../middlewares/auth.middlewares');
const authController = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post(
  '/signup',
  validationMiddleware.createUserValidation,
  authController.signup
);

authRouter.post(
  '/login',
  validationMiddleware.loginUserValidation,
  authController.login
);

authRouter.use(authMiddleware.protect);

authRouter.get('renew', authController.renew);

module.exports = authRouter;
