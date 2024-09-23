const express = require('express');
const router = express.Router();
const remarqueController = require('../controllers/remarqueController');

router.get('/', remarqueController.getAllRemarques);
router.get('/:id', remarqueController.getRemarqueById);
router.post('/', remarqueController.createRemarque);
router.put('/:id', remarqueController.updateRemarque);
router.delete('/:id', remarqueController.deleteRemarque);

module.exports = router;
