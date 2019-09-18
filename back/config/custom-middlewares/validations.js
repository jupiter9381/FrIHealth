const { check, validationResult } = require("express-validator");

const loginValidations = [
  check("username")
    .not()
    .isEmpty(),
  check("password")
    .not()
    .isEmpty()
];

const registerValidations = [
  check("username")
    .not()
    .isEmpty(),
  check("password")
    .not()
    .isEmpty(),
  check("confirmPassword")
    .not()
    .isEmpty()
];

module.exports = {
  loginValidations,
  registerValidations
};
