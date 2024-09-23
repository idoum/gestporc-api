const express = require('express');
const router = express.Router();
const soinsController = require('../controllers/soinsController');

router.get('/', soinsController.getAllSoins);
router.get('/:id', soinsController.getSoinsById);
router.post('/', soinsController.createSoins);
router.put('/:id', soinsController.updateSoins);
router.delete('/:id', soinsController.deleteSoins);

module.exports = router;
