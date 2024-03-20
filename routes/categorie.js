// routes/categorieRoutes.js
const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorie');

// Route pour créer une catégorie
router.post('/', categorieController.categorieCreate);

// Route pour créer plusieurs catégories
router.post('/many', categorieController.categoriesCreate);
router.get('/', categorieController.getAllCategorie);
module.exports = router;
