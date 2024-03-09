const Joi = require("joi");

const validateSignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const eventSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = { validateLoginSchema, validateSignUpSchema, eventSchema };
