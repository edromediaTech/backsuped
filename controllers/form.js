const Form = require('../models/form');

exports.createForm = async (req, res) => {
    try {
        const form = new Form(req.body);
        await form.save();
        res.status(201).json(form);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id)
            .populate({
                path: 'questionnaires',
                populate: { path: 'optionQuestions' }
            });

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find().populate('groupeForm').populate('questionnaires');
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add more controller functions as needed for updating and deleting Forms

