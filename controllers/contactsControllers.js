const { catchAsync, HttpError, validSchemas } = require("../utils");

const { Contact } = require("../models");
const { contactServices } = require("../services");

exports.getById = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);

  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

exports.addContact = catchAsync(async (req, res) => {
  // const newContact = await Contact.create(req.body);

  const newContact = await contactServices.createContact(req.body, req.user);

  res.status(201).json(newContact);
});

exports.removeContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
});

exports.updateContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  );

  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

exports.updateStatusContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

exports.getContacts = catchAsync(async (req, res) => {
  const { error } = validSchemas.contactListSchema.validate(req.query);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { contacts, total } = await contactServices.getContacts(
    req.query,
    req.user
  );

  res.status(200).json({
    contacts,
    total,
    owner: {
      _id: req.user._id,
      email: req.user.email,
      subscription: req.user.subscription,
    },
  });
});
