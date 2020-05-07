const joi = require("@hapi/joi");

const registerValidate = (data) => {
  const schema = joi.object({
    name: joi.string().required().max(255).min(6),
    email: joi.string().required().max(255).min(6).email(),
    password: joi.string().required().max(1024).min(6),
  });
  const { error } = schema.validate(data);
  return error;
};
const loginValidate = (data) => {
  const schema = joi.object({
    email: joi.string().required().max(255).min(6).email(),
    password: joi.string().required().max(1024).min(6),
  });
  const { error } = schema.validate(data);
  return error;
};

module.exports = {
  registerValidate,
  loginValidate,
};
