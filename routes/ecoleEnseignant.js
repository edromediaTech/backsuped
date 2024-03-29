
const express = require('express');
const router = express.Router();
const ecoleEnseignantController = require('../controllers/ecoleEnseignant');

router.post('/', ecoleEnseignantController.createEcoleEnseignant);
router.get('/', ecoleEnseignantController.getAllEcoleEnseignants);
router.put('/:id', ecoleEnseignantController.updateEcoleEnseignant);
router.delete('/:id', ecoleEnseignantController.deleteEcoleEnseignant);

module.exports = router;