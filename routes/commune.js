// routes.js

const express = require('express');
const router = express.Router();
const communeController = require('../controllers/commune');

// Route pour créer une nouvelle commune
router.post('/', communeController.createCommune);
router.post('/many', communeController.createCommunes);
// Route pour récupérer toutes les communes
router.get('/', communeController.getAllCommune);

// Route pour récupérer une commune par son ID
router.get('/:id', communeController.getByIdCommune);

// Route pour mettre à jour une commune
router.put('/:id', communeController.updateCommune);

// Route pour supprimer une commune
router.delete('/:id', communeController.deleteCommune);

module.exports = router;
