const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
const niveauCtrl = require('../controllers/niveau');

router.get('/', niveauCtrl.getAllNiveau);

module.exports = router;