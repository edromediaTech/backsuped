const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
const classeMatiereCtrl = require('../controllers/classeMatiere');

// 3. Définir les routes

router.post('/', classeMatiereCtrl.createClasseMatiere);
router.get('/', classeMatiereCtrl.getAllClasseMatieres);
router.put('/:id', classeMatiereCtrl.updateClasseMatiere);
router.delete('/:id', classeMatiereCtrl.deleteClasseMatiere);

module.exports = router;