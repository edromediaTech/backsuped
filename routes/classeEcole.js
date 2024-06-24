// routes/classeEcoleRoutes.js
const express = require('express');
const router = express.Router();
const classeEcoleController = require('../controllers/classeEcole');
const auth = require('../middleware/auth');

// Route pour créer une nouvelle association ClasseEcole
router.post('/',auth, classeEcoleController.createClasseEcole);
router.get('/:ecoleId/classes', classeEcoleController.getClassesAndSallesByEcole);


module.exports = router;
