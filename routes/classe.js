const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
const classeCtrl = require('../controllers/classe');

router.get('/', classeCtrl.getAllClasse);
router.get('/:classeId/matieres', classeCtrl.getMatieresByClasse);

module.exports = router;