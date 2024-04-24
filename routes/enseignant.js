// routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const enseignantController = require('../controllers/enseignant');

// 4. Définir les routes
router.post('/', auth, enseignantController.createEnseignant);
router.get('/', auth, enseignantController.getAllEnseignants);
router.get('/nbEnseignant', enseignantController.getAllEnseignantsCount);
router.put('/:id', auth, enseignantController.updateEnseignant);
router.delete('/:id', auth, enseignantController.deleteEnseignant);

module.exports = router;
