const EcoleEnseignant = require('../models/ecoleEnseignant');
const enseignant = require('../models/enseignant');
const Personnel = require('../models/personnel');

// Create
exports.createEcoleEnseignant = async (req, res) => {
    try {
        const ecoleEnseignant = await EcoleEnseignant.create(req.body);
        res.status(201).json(ecoleEnseignant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read
exports.getAllEcoleEnseignants = async (req, res) => {
    try {
        const ecoleEnseignants = await EcoleEnseignant.find().populate("ecole")
        .populate({
            path: 'enseignant', // Supposons que vous avez un champ comments dans Post
            model: 'Enseignant',
            populate: {
              path: 'personnel', // Peuple l'utilisateur de chaque commentaire
              model: 'Personnel'
            }
          });
        res.json(ecoleEnseignants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
exports.updateEcoleEnseignant = async (req, res) => {
    try {
        const { id } = req.params;
        const ecoleEnseignant = await EcoleEnseignant.findByIdAndUpdate(id, req.body, { new: true });
        res.json(ecoleEnseignant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
exports.deleteEcoleEnseignant = async (req, res) => {
    try {
        const { id } = req.params;
        await EcoleEnseignant.findByIdAndDelete(id);
        res.json({ message: 'EcoleEnseignant deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};