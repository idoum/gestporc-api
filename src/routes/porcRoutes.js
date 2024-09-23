const express = require('express');
const router = express.Router();
const porcController = require('../controllers/porcController');

router.get('/', porcController.getAllPorcs);
router.get('/:id', porcController.getPorcById);
router.post('/', porcController.createPorc);
router.put('/:id', porcController.updatePorc);
router.delete('/:id', porcController.deletePorc);

module.exports = router;
