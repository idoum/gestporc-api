const express = require('express');
const router = express.Router();
const maladieController = require('../controllers/maladieController');

router.get('/', maladieController.getAllMaladies);
router.get('/:id', maladieController.getMaladieById);
router.post('/', maladieController.createMaladie);
router.put('/:id', maladieController.updateMaladie);
router.delete('/:id', maladieController.deleteMaladie);

module.exports = router;
