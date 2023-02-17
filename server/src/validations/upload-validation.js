const Joi = require("joi");

const body = Joi.object({
  postPicture: Joi.any().required(),
  caption: Joi.string().min(1).max(1000),
});

module.exports = {
  loginUserValidation: {
    body,
  },
};
