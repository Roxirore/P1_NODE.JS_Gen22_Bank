const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters long'),
  validFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters long'),
  validFields,
];

exports.updateUserValidation = [
  body('role').notEmpty().withMessage('role cannot be empty'),
  body('status').notEmpty().withMessage('status cannot be empty'),
  validFields,
];

exports.deleteUserValidation = [
  body('role').notEmpty().withMessage('role cannot be empty'),
  body('status').notEmpty().withMessage('status cannot be empty'),
  validFields,
];

exports.updatedPasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters long'),
  body('newPassword')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters long'),
  validFields,
];
