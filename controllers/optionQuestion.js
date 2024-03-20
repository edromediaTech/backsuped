const OptionQuestion = require('../models/optionQuestion');

exports.createOptionQuestion = async (req, res) => {
    try {
        const optionQuestion = new OptionQuestion(req.body);
        await optionQuestion.save();
        res.status(201).json(optionQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOptionQuestions = async (req, res) => {
    try {
        const optionQuestions = await OptionQuestion.find().populate('questionnaire');
        res.status(200).json(optionQuestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOptionQuestionById = async (req, res) => {
    try {
        const optionQuestion = await OptionQuestion.findById(req.params.id).populate('questionnaire');
        if (!optionQuestion) {
            return res.status(404).json({ message: 'OptionQuestion not found' });
        }
        res.json(optionQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOptionQuestion = async (req, res) => {
    try {
        const optionQuestion = await OptionQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!optionQuestion) {
            return res.status(404).json({ message: 'OptionQuestion not found' });
        }
        res.json(optionQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteOptionQuestion = async (req, res) => {
    try {
        const optionQuestion = await OptionQuestion.findByIdAndDelete(req.params.id);
        if (!optionQuestion) {
            return res.status(404).json({ message: 'OptionQuestion not found' });
        }
        res.json({ message: 'OptionQuestion deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
