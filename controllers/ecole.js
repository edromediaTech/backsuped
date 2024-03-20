// controllers/ecole.js

const Ecole = require('../models/ecole');
const { log } = require('../utils/logger');

exports.createEcole = async (req, res) => {
  console.log(req.body)
  try {
    const ecole = new Ecole(req.body);
    await ecole.save();
    res.status(201).json(ecole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEcoles = async (req, res) => {
  try {
    const ecoles = await Ecole.find();
    res.json(ecoles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEcoleById = async (req, res) => {
  try {
    const ecole = await Ecole.findById(req.params.id);
    if (!ecole) {
      return res.status(404).json({ message: "Ecole not found" });
    }
    res.json(ecole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEcole = async (req, res) => {
  try {
    const ecole = await Ecole.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ecole) {
      return res.status(404).json({ message: "Ecole not found" });
    }
    res.json(ecole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEcole = async (req, res) => {
 
  try {
    const ecole = await Ecole.deleteOne({_id:req.params.id});
    if (!ecole) {
      return res.status(404).json({ message: "Ecole not found" });
    }
    res.json({ message: "Ecole deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour créer plusieurs ecole à partir d'un tableau
exports.createEcoles = async (req, res) => {
    try {
        // Vérifiez si la requête contient un tableau de ecole
        if (!req.body || !Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Invalid request body. Array of ecole expected.' });
        }

        // Créez les ecole à partir du tableau reçu
        const ecole = await Ecole.create(req.body);

        // Répondre avec les districts créés
        res.status(201).json(ecole);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        res.status(500).json({ error: 'An error occurred while creating districts.', details: error.message });
    }
};
