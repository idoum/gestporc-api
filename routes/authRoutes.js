const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authControllerller");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
