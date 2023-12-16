const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactsDB = await fs.readFile(contactPath);
  return JSON.parse(contactsDB);
};

const getById = async (contactId) => {
  const contactsArr = await listContacts();
  const data = contactsArr.find((item) => item.id === contactId);
  return data || null;
};

const removeContact = async (contactId) => {
  const contactsArr = await listContacts();

  const deletedContact = contactsArr.find((item) => item.id === contactId);

  if (deletedContact) {
    const newList = contactsArr.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactPath, JSON.stringify(newList));
    return deletedContact;
  }
  return null;
};

const addContact = async (body) => {
  const contactsArr = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };
  contactsArr.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contactsArr, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsArr = await listContacts();

  const updateIndex = contactsArr.findIndex((item) => item.id === contactId);

  if (updateIndex !== -1) {
    contactsArr[updateIndex] = {
      id: contactId,
      ...body,
    };

    await fs.writeFile(contactPath, JSON.stringify(contactsArr, null, 2));
    return contactsArr[updateIndex];
  }
  return null;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
