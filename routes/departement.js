const express = require('express');
const router = express.Router();
const departementController = require('../controllers/departement');

// Route pour récupérer tous les départements
router.get('/', departementController.getAllDepartements);
router.get('/:id', departementController.getDepartementById);
// Route pour créer un nouveau département
router.post('/', departementController.createDepartement);

module.exports = router;
