const express = require('express');
const router = express.Router();
const affectationController = require('../controllers/affectation');

router.post('/', affectationController.createAffectation);
router.get('/', affectationController.getAllAffectations);
router.put('/:id', affectationController.updateAffectation);
router.delete('/:id', affectationController.deleteAffectation);

module.exports = router;