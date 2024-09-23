const express = require('express');
const router = express.Router();
const porcVaccinController = require('../controllers/porcvaccinController');

router.get('/', porcVaccinController.getAllPorcVaccins);
router.get('/:id', porcVaccinController.getPorcVaccinById);
router.post('/', porcVaccinController.createPorcVaccin);
router.put('/:id', porcVaccinController.updatePorcVaccin);
router.delete('/:id', porcVaccinController.deletePorcVaccin);

module.exports = router;
