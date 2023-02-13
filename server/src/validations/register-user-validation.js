const Joi = require("joi");

const body = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  userName: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  birthDate: Joi.date().required(),
  tlfNumber: Joi.string().min(8).required(),
  gender: Joi.string().valid("Male", "Female").required(),
});

module.exports = {
  registerUserValidation: {
    body,
  },
};
