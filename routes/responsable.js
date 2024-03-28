// routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const responsableController = require('../controllers/responsable');

// 4. Définir les routes
router.post('/', auth, responsableController.createResponsable);
router.get('/', auth, responsableController.getAllResponsables);
router.put('/:id', auth, responsableController.updateResponsable);
router.delete('/:id', auth, responsableController.deleteResponsable);

module.exports = router;
