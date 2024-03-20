// routes/ecoleRoutes.js

const express = require('express');
const router = express.Router();
const ecoleController = require('../controllers/ecole');

router.post('/', ecoleController.createEcole);
router.post('/many', ecoleController.createEcoles);
router.get('/', ecoleController.getAllEcoles);
router.get('/:id', ecoleController.getEcoleById);
router.put('/:id', ecoleController.updateEcole);
router.delete('/:id', ecoleController.deleteEcole);

module.exports = router;
