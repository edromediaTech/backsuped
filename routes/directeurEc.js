// routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const directeurEcController = require('../controllers/directeurEc');

// 4. Définir les routes
router.post('/', auth, directeurEcController.createDirecteur);
router.get('/', auth, directeurEcController.getAllDirecteurs);
router.put('/:id', auth, directeurEcController.updateDirecteur);
router.delete('/:id', auth, directeurEcController.deleteDirecteur);

module.exports = router;
