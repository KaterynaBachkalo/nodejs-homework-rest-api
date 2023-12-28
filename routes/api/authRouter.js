const express = require("express");
const { authMiddleware } = require("../../middlewares");
const { authControllers } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  authMiddleware.checkRegistrationData,
  authControllers.registration
);

router.post("/login", authMiddleware.checkLoginData, authControllers.login);

router.post("/logout", authMiddleware.protect, authControllers.logout);

router.get("/current", authMiddleware.protect, authControllers.getCurrentUser);

module.exports = router;
