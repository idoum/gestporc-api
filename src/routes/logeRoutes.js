const express = require('express');
const router = express.Router();
const logeController = require('../controllers/logeController');

router.get('/', logeController.getAllLoges);
router.get('/:id', logeController.getLogeById);
router.post('/', logeController.createLoge);
router.put('/:id', logeController.updateLoge);
router.delete('/:id', logeController.deleteLoge);

module.exports = router;
