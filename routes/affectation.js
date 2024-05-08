const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const affectationController = require('../controllers/affectation');

router.post('/',auth, affectationController.createAffectation);
router.get('/',auth, affectationController.getAllAffectations);
router.put('/:id',auth, affectationController.updateAffectation);
router.delete('/:id',auth, affectationController.deleteAffectation);

module.exports = router;