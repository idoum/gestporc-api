const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, checkRole(['admin', 'manager']), userController.getAllUsers);
router.get('/:id', authMiddleware, checkRole(['admin', 'manager']), userController.getUserById);
router.put('/:id', authMiddleware, checkRole(['admin']), userController.updateUser);
router.delete('/:id', authMiddleware, checkRole(['admin']), userController.deleteUser);

module.exports = router;
