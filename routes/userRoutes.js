const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userControllerller");
const authMiddleware = require("../../middlewares/authMiddlewareware");
const checkRole = require("../../middlewares/roleMiddlewareware");

router.get(
  "/",
  authMiddleware,
  checkRole(["admin", "manager"]),
  userController.getAllUsers
);
router.get(
  "/:id",
  authMiddleware,
  checkRole(["admin", "manager"]),
  userController.getUserById
);
router.put(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  userController.updateUser
);
router.delete(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  userController.deleteUser
);

module.exports = router;
