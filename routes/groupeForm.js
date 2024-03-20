const express = require('express');
const router = express.Router();
const groupeFormController = require('../controllers/groupeForm');

// Définition des routes
router.post('/', groupeFormController.addGroupeForm);
router.get('/', groupeFormController.getAllGroupeForms);

// Ajouter ici les autres routes pour mettre à jour, supprimer, etc.

module.exports = router;
