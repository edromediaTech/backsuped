const express = require('express');
const router = express.Router();
const departementController = require('../controllers/departement');
const auth = require('../middleware/auth');
// Route pour récupérer tous les départements
router.get('/', departementController.getAllDepartements);
router.get('/:id', auth, departementController.getDepartementById);
// Route pour créer un nouveau département
router.post('/',auth, departementController.createDepartement);

module.exports = router;
