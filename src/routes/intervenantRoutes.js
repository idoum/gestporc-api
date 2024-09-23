const express = require('express');
const router = express.Router();
const intervenantsController = require('../controllers/intervenantController');

router.get('/', intervenantsController.getAllIntervenants);
router.get('/:id', intervenantsController.getIntervenantById);
router.post('/', intervenantsController.createIntervenant);
router.put('/:id', intervenantsController.updateIntervenant);
router.delete('/:id', intervenantsController.deleteIntervenant);

module.exports = router;
