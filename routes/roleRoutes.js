const express = require("express");
const router = express.Router();
const roleController = require("../../controllers/roleControllerller");
const authMiddleware = require("../../middlewares/authMiddlewareware");
const checkRole = require("../../middlewares/roleMiddlewareware");

router.get(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  roleController.getAllRoles
);
router.get(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  roleController.getRoleById
);
router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  roleController.createRole
);
router.put(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  roleController.updateRole
);
router.delete(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  roleController.deleteRole
);

module.exports = router;
