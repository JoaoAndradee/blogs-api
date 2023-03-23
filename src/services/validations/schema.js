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

const createCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
});

const postUpdateSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = {
  emailSchema,
  passwordSchema,
  loginSchema,
  createUserSchema,
  createCategorySchema,
  postSchema,
  postUpdateSchema,
};
