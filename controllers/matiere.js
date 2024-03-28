// controllers/niveauController.js
const Matiere = require('../models/matiere');

exports.getAllMatieres = async (req, res) => {
    try {
        const matieres = await Matiere.find();
        res.json(matieres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };