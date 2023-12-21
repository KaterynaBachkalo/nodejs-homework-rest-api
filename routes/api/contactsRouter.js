const express = require("express");
const contactsControllers = require("../../controllers");
const { contactMiddleware } = require("../../middlewares");

const router = express.Router();

router
  .route("/")
  .get(contactsControllers.listContacts)
  .post(contactMiddleware.checkAddContact, contactsControllers.addContact);

router.use("/:contactId", contactMiddleware.checkContactId);
router
  .route("/:contactId")
  .get(contactsControllers.getById)
  .delete(contactsControllers.removeContact)
  .put(contactMiddleware.checkUpdateContact, contactsControllers.updateContact);

router.use(
  "/:contactId/favorite",
  contactMiddleware.checkContactId,
  contactMiddleware.checkStatusContact
);
router
  .route("/:contactId/favorite")
  .patch(contactsControllers.updateStatusContact);

module.exports = router;
