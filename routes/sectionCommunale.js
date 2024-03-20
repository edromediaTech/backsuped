// routes.js

const express = require('express');
const router = express.Router();
const sectionCommunaleController = require('../controllers/sectionCommunale');

router.post('/', sectionCommunaleController.createSectionCommunale);
router.post('/many', sectionCommunaleController.createSectionCommunales);
router.get('/', sectionCommunaleController.getAllSectionCommunale);
router.get('/:id', sectionCommunaleController.getByIdSectionCommunale);
router.put('/:id', sectionCommunaleController.updateSectionCommunale);
router.delete('/:id', sectionCommunaleController.deleteSectionCommunale);

module.exports = router;
