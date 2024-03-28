// controllers/niveauController.js
const Niveau = require('../models/niveau');

exports.getAllNiveau = async (req, res) => {
    try {
        const niveaux = await Niveau.find();
        res.json(niveaux);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };