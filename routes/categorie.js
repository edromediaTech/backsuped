// routes/categorieRoutes.js
const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorie');
const auth = require('../middleware/auth');
// Route pour créer une catégorie
router.post('/',auth, categorieController.categorieCreate);

// Route pour créer plusieurs catégories
router.post('/many',auth, categorieController.categoriesCreate);
router.get('/',auth, categorieController.getAllCategorie);
module.exports = router;
