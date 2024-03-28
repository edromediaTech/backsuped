// controllers/ClasseController.js
const Classe = require('../models/classe');

exports.getAllClasse = async (req, res) => {
    try {
        const classes = await Classe.find();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };