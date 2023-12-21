const Joi = require("joi");

exports.schema = Joi.object({
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

exports.updateStatusSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing required favorite field" }),
});
