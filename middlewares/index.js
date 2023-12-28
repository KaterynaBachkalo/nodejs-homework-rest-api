const contactMiddleware = require("./contactMiddleware");
const authMiddleware = require("./authMiddleware");
const checkLoginData = require("./authMiddleware");

module.exports = { contactMiddleware, authMiddleware, checkLoginData };
