const express = require('express');
const router = express.Router();
const porcLogeController = require('../controllers/porcLogeController');

router.get('/', porcLogeController.getAllPorcLoges);
router.get('/:id', porcLogeController.getPorcLogeById);
router.post('/', porcLogeController.createPorcLoge);
router.put('/:id', porcLogeController.updatePorcLoge);
router.delete('/:id', porcLogeController.deletePorcLoge);

module.exports = router;
