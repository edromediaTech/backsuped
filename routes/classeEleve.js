const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
const eleveCtrl = require('../controllers/eleve');
const auth = require('../middleware/auth');

router.post('/',auth, createClassEleve);
router.get('/',auth, getAllClassEleves);
router.put('/:id',auth, updateClassEleve);
router.delete('/:id',auth, deleteClassEleve);

module.exports = router;