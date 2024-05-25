// routes/ecoleRoutes.js

const express = require('express');
const router = express.Router();
const ecoleController = require('../controllers/ecole');

router.post('/', ecoleController.createEcole);
router.post('/many', ecoleController.createEcoles);
router.post('/coordonnees', ecoleController.updateEcoleCoordinates);
router.get('/', ecoleController.getAllEcoles);
router.get('/:id', ecoleController.getEcoleById);
router.get('/parzone/:zoneId', ecoleController.getEcolesByZone);
//router.get('/parcommune/:communeId', ecoleController.getEcolesByCommune);
router.get('/:ecoleId/enseignants', ecoleController.getEnseignantsByEcole);
router.get('/:communeId/ecoles', ecoleController.getEcolesParCommune);
router.get('/ecoped/count', ecoleController.getEcoleCountPerDistrict);
//router.get('/ecoles/full', ecoleController.getEcoleFull);

// router.get('/district/:id', ecoleController.getEcolesByDistrict);
router.get('/:districtId/district', ecoleController.getEcolesByDistrict);
router.put('/:id', ecoleController.updateEcole);

router.delete('/:id', ecoleController.deleteEcole);

module.exports = router;
