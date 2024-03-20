const express = require('express');
const questionnaireController = require('../controllers/questionnaire');

const router = express.Router();

router.post('/', questionnaireController.createQuestionnaire);
router.get('/', questionnaireController.getQuestionnaires);

// Additional routes for updating and deleting Questionnaires can be added here.

module.exports = router;
