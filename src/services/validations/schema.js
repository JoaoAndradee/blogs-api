const Joi = require('joi');

const emailSchema = Joi.string().min(1).required();

const passwordSchema = Joi.string().min(1).required();

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const createUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

module.exports = {
  emailSchema,
  passwordSchema,
  loginSchema,
  createUserSchema,
};
