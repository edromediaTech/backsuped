// routes/classeEcoleRoutes.js
const express = require('express');
const router = express.Router();
const classeEcoleController = require('../controllers/classeEcole');

// Route pour créer une nouvelle association ClasseEcole
router.post('/', classeEcoleController.createClasseEcole);

module.exports = router;
