const express = require('express');
const router = express.Router();
const roleUserController = require('../controllers/roleUserController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// Routes pour les opérations CRUD
router.get('/', authMiddleware, checkRole(['admin']), roleUserController.getAllRoleUsers);
router.get('/:id', authMiddleware, checkRole(['admin']), roleUserController.getRoleUserById);
router.post('/', authMiddleware, checkRole(['admin']), roleUserController.createRoleUser);
router.put('/:id', authMiddleware, checkRole(['admin']), roleUserController.updateRoleUser);
router.delete('/:id', authMiddleware, checkRole(['admin']), roleUserController.deleteRoleUser);

module.exports = router;
