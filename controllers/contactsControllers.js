const Joi = require("joi");

const { catchAsync, HttpError } = require("../utils");

const contactsModels = require("../models");

const addSchema = Joi.object({
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

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(15).required(),
}).messages({ "any.required": "missing fields" });

exports.listContacts = catchAsync(async (req, res) => {
  const result = await contactsModels.listContacts();
  res.status(200).json(result);
});

exports.getById = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsModels.getById(contactId);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

exports.addContact = catchAsync(async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const result = await contactsModels.addContact(req.body);
  res.status(201).json(result);
});

exports.removeContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsModels.removeContact(contactId);

  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
});

exports.updateContact = catchAsync(async (req, res) => {
  const { error } = updateSchema.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { contactId } = req.params;
  const result = await contactsModels.updateContact(contactId, req.body);

  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
});