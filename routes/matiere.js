const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
const matiereCtrl = require('../controllers/matiere');

router.get('/', matiereCtrl.getAllMatieres);

module.exports = router;