const express = require("express");
const contactsControllers = require("../../controllers");

const router = express.Router();

router.get("/", contactsControllers.listContacts);

router.get("/:contactId", contactsControllers.getById);

router.post("/", contactsControllers.addContact);

router.delete("/:contactId", contactsControllers.removeContact);

router.put("/:contactId", contactsControllers.updateContact);

module.exports = router;
