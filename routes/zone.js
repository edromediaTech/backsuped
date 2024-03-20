// routes.js ou une section de votre app.js

const express = require('express');
const router = express.Router();
const zoneController = require('../controllers/zone');

router.post('/', zoneController.createZone);
router.post('/many', zoneController.createZones);
router.get('/', zoneController.getAllZones);
router.get('/:id', zoneController.getZoneById);
router.put('/:id', zoneController.updateZone);
router.delete('/:id', zoneController.deleteZone);

module.exports = router;
