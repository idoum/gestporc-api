const express = require('express');
const router = express.Router();
const poidsController = require('../controllers/poidsController');

router.get('/', poidsController.getAllPoids);
router.get('/:id', poidsController.getPoidsById);
router.post('/', poidsController.createPoids);
router.put('/:id', poidsController.updatePoids);
router.delete('/:id', poidsController.deletePoids);

module.exports = router;
