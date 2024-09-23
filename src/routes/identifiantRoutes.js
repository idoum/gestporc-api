const express = require('express');
const router = express.Router();
const identifiantController = require('../controllers/identifiantController');

router.get('/', identifiantController.getAllIdentifiants);
router.get('/:id', identifiantController.getIdentifiantById);
router.post('/', identifiantController.createIdentifiant);
router.put('/:id', identifiantController.updateIdentifiant);
router.delete('/:id', identifiantController.deleteIdentifiant);

module.exports = router;
