const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
const classeMatiereCtrl = require('../controllers/classeMatiere');

// 3. Définir les routes

router.post('/',auth, classeMatiereCtrl.createClasseMatiere);
router.get('/',auth, classeMatiereCtrl.getAllClasseMatieres);
router.put('/:id',auth, classeMatiereCtrl.updateClasseMatiere);
router.delete('/:id',auth, classeMatiereCtrl.deleteClasseMatiere);

module.exports = router;