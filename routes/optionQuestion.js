const express = require('express');
const optionQuestionController = require('../controllers/optionQuestion');

const router = express.Router();

router.post('/', optionQuestionController.createOptionQuestion);
router.get('/', optionQuestionController.getOptionQuestions);
router.get('/:id', optionQuestionController.getOptionQuestionById);
router.put('/:id', optionQuestionController.updateOptionQuestion);
router.delete('/:id', optionQuestionController.deleteOptionQuestion);

module.exports = router;
