// routes.js

const express = require('express');
const router = express.Router();
const communeController = require('../controllers/commune');
const auth = require('../middleware/auth');
// Route pour créer une nouvelle commune
router.post('/',auth, communeController.createCommune);
router.post('/many',auth, communeController.createCommunes);
// Route pour récupérer toutes les communes
router.get('/', communeController.getAllCommune);

// Route pour récupérer une commune par son ID
router.get('/:id',auth, communeController.getByIdCommune);

// Route pour mettre à jour une commune
router.put('/:id', communeController.updateCommune);

// Route pour supprimer une commune
router.delete('/:id',auth, communeController.deleteCommune);

module.exports = router;
