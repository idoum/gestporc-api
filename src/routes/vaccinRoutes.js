const express = require('express');
const router = express.Router();
const vaccinController = require('../controllers/vaccinController');

router.get('/', vaccinController.getAllVaccins);
router.get('/:id', vaccinController.getVaccinById);
router.post('/', vaccinController.createVaccin);
router.put('/:id', vaccinController.updateVaccin);
router.delete('/:id', vaccinController.deleteVaccin);

module.exports = router;
