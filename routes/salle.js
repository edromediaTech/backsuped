// routes/salleRoutes.js
const express = require('express');
const router = express.Router();
const salleController = require('../controllers/salle');

// Route pour créer une nouvelle salle
router.post('/', salleController.createSalle);

module.exports = router;
