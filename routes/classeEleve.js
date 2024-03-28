const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
const eleveCtrl = require('../controllers/eleve');

router.post('/', createClassEleve);
router.get('/', getAllClassEleves);
router.put('/:id', updateClassEleve);
router.delete('/:id', deleteClassEleve);

module.exports = router;