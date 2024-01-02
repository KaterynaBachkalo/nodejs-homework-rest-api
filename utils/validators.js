const Joi = require("joi");
// const { regex } = require("../constants");

exports.contactValidSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({ "any.required": "missing required name field" }),

  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),

  phone: Joi.string()
    .min(3)
    .max(15)
    .required()
    .messages({ "any.required": "missing required phone field" }),
});

exports.updateStatusValidSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing required favorite field" }),
});

exports.userValidSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": "Set password for user",
  }),

  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Email is required" }),
});

exports.updateSubSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid("starter", "pro", "business")
    .messages({ msg: "This subscription doesn't exist" }),
});
