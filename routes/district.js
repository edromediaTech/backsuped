const express = require('express');
const router = express.Router();
const districtController = require('../controllers/district');

// Route pour obtenir tous les districts
router.get('/', districtController.getAllDistricts);

// Route pour créer un nouveau district
router.post('/', districtController.createDistrict);
router.post('/many', districtController.createDistricts);

// Route pour mettre à jour un district
router.put('/:id', districtController.updateDistrict);

// Route pour supprimer un district
router.delete('/:id', districtController.deleteDistrict);

module.exports = router;
