const ClasseMatiere = require('../models/classeMatiere');

// Create
exports.createClasseMatiere = async (req, res) => {
    try {
        const classeMatiere = await ClasseMatiere.create(req.body);
        res.status(201).json(classeMatiere);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read
exports.getAllClasseMatieres = async (req, res) => {
    try {
        const classeMatieres = await ClasseMatiere.find().populate("classe").populate("matiere");
        res.json(classeMatieres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
exports.updateClasseMatiere = async (req, res) => {
    try {
        const { id } = req.params;
        const classeMatiere = await ClasseMatiere.findByIdAndUpdate(id, req.body, { new: true });
        res.json(classeMatiere);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
exports.deleteClasseMatiere = async (req, res) => {
    try {
        const { id } = req.params;
        await ClasseMatiere.findByIdAndDelete(id);
        res.json({ message: 'ClasseMatiere deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


