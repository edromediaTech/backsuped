const Questionnaire = require('../models/questionnaire');

// Create a new Questionnaire
exports.createQuestionnaire = async (req, res) => {
    try {
        const questionnaire = new Questionnaire(req.body);
        await questionnaire.save();
        res.status(201).json(questionnaire);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Questionnaires
exports.getQuestionnaires = async (req, res) => {
    try {
        const questionnaires = await Questionnaire.find().populate('form');
        res.status(200).json(questionnaires);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Additional controller functions for updating and deleting Questionnaires can be implemented here.
