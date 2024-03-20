const express = require('express');
const formController = require('../controllers/form');

const router = express.Router();

router.post('/', formController.createForm);
router.get('/', formController.getForms);
router.get('/:id', formController.getFormById);
// Define more routes as needed for updating and deleting Forms

module.exports = router;
