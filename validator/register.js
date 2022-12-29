const Validator = require('validator');
const isEmpty = require('./empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  console.log(data);
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.address = !isEmpty(data.address) ? data.address : '';

  if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.address, { min: 20, max: 50 })) {
    errors.address = 'enter address between 20 to 50 charcter';
  }

  console.log("ee", errors);
  return {
    data,
    errors,
    isValid: isEmpty(errors)
  };
};
