// routes.js
const express = require('express');
const router = express.Router();
const directeurController = require('../controllers/directeur');

// Create
router.post('/directeurs', directeurController.createDirecteur);

// Read
router.get('/directeurs', directeurController.getDirecteurs);

// Update
router.put('/directeurs/:id', directeurController.updateDirecteur);

// Delete
router.delete('/directeurs/:id', directeurController.deleteDirecteur);

module.exports = router;
