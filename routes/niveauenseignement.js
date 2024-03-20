// routes/categorieRoutes.js
const express = require('express');
const router = express.Router();
const niveauenseignementController = require('../controllers/niveauenseignement');

// Route pour créer une catégorie
router.post('/', niveauenseignementController.niveauenseignementCreate);

// Route pour créer plusieurs catégories
router.post('/many', niveauenseignementController.niveauenseignementsCreate);
router.get('/', niveauenseignementController.getAllNiveauenseignement);

module.exports = router;
