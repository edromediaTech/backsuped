
const ClassEleve = require('../models/classEleve');

// 2. Fonctions de contrôleur CRUD

// Create
exports.createClassEleve = async (req, res) => {
    try {
        const classEleve = await ClassEleve.create(req.body);
        res.status(201).json(classEleve);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read
exports.getAllClassEleves = async (req, res) => {
    try {
        const classEleves = await ClassEleve.find();
        res.json(classEleves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
exports.updateClassEleve = async (req, res) => {
    try {
        const { id } = req.params;
        const classEleve = await ClassEleve.findByIdAndUpdate(id, req.body, { new: true });
        res.json(classEleve);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
exports.deleteClassEleve = async (req, res) => {
    try {
        const { id } = req.params;
        await ClassEleve.findByIdAndDelete(id);
        res.json({ message: 'ClassEleve deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



