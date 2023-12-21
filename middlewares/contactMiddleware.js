const { Types } = require("mongoose");
const { Contact } = require("../models");
const { catchAsync, HttpError } = require("../utils");
const { schema, updateStatusSchema } = require("../utils/validators");

const checkAddContact = catchAsync(async (req, res, next) => {
  const { value, error } = schema.validate(req.body);

  if (Object.keys(req.body).length === 0)
    throw new HttpError(400, "missing fields");

  if (error) {
    throw new HttpError(400, error.message);
  }

  const userExists = await Contact.exists({ email: value.email });

  if (userExists)
    throw new HttpError(409, "User with this email already exists..");

  req.body = value;

  next();
});

const checkContactId = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const idIsValid = Types.ObjectId.isValid(contactId);

  if (!idIsValid) throw new HttpError(404, "User not found..");

  const userExists = await Contact.exists({ _id: contactId });

  if (!userExists) throw new HttpError(404, "User not found..");

  next();
});

const checkUpdateContact = catchAsync(async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (Object.keys(req.body).length === 0)
    throw new HttpError(400, "missing fields");

  if (error) throw new HttpError(400, error.message);

  next();
});

const checkStatusContact = catchAsync(async (req, res, next) => {
  const { error } = updateStatusSchema.validate(req.body);

  if (Object.keys(req.body).length === 0)
    throw new HttpError(400, "missing field favorite");

  if (error) throw new HttpError(400, error.message);

  next();
});

module.exports = {
  checkAddContact,
  checkContactId,
  checkUpdateContact,
  checkStatusContact,
};
