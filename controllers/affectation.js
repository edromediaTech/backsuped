const Affectation = require('../models/affectation');
// Create
exports.createAffectation = async (req, res) => {
    console.log(req.body)
    try {
        const affectation = await Affectation.create(req.body);
        res.status(201).json(affectation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read
exports.getAllAffectations = async (req, res) => {
    try {
        const affectations = await Affectation.find();
        res.json(affectations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
exports.updateAffectation = async (req, res) => {
    try {
        const { id } = req.params;
        const affectation = await Affectation.findByIdAndUpdate(id, req.body, { new: true });
        res.json(affectation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
exports.deleteAffectation = async (req, res) => {
    try {
        const { id } = req.params;
        await Affectation.findByIdAndDelete(id);
        res.json({ message: 'Affectation deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};