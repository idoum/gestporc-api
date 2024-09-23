const express = require('express');
const router = express.Router();
const sailliesController = require('../controllers/sailliesController');

router.get('/', sailliesController.getAllSaillies);
router.get('/:id', sailliesController.getSaillieById);
router.post('/', sailliesController.createSaillie);
router.put('/:id', sailliesController.updateSaillie);
router.delete('/:id', sailliesController.deleteSaillie);

module.exports = router;
