const express = require('express');
const router = express.Router();
const typesController = require('../controllers/typesController');

router.get('/', typesController.getAllTypes);
router.get('/:id', typesController.getTypeById);
router.post('/', typesController.createType);
router.put('/:id', typesController.updateType);
router.delete('/:id', typesController.deleteType);

module.exports = router;
