const { catchAsync, HttpError } = require("../utils");

const { Contact } = require("../models");

exports.listContacts = catchAsync(async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
});

exports.getById = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);

  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

exports.addContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.body);
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
