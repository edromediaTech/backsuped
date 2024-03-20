// routes/categorieRoutes.js
const express = require('express');
const router = express.Router();
const vacationController = require('../controllers/vacation');

// Route pour créer une catégorie
router.post('/', vacationController.vacationCreate);

// Route pour créer plusieurs catégories
router.post('/many', vacationController.vacationsCreate);
router.get('/', vacationController.getAllVacation);
module.exports = router;
