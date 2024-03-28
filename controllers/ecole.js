// controllers/ecole.js
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Ecole = require('../models/ecole');
const District = require('../models/district');
const Commune = require('../models/commune');

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


// Méthode pour récupérer toutes les écoles d'un district par son ID
exports.getEcolesByDistrict = async (req, res) => {
  const districtId = req.params.districtId; // Supposons que l'ID du district est passé comme paramètre dans l'URL

  District.aggregate([
    { $match: { _id: ObjectId(districtId) } },
    { $lookup: { 
        from: "communes",
        localField: "_id",
        foreignField: "district",
        as: "communes"
    }},
    { $unwind: "$communes" },
    { $lookup: { 
        from: "zones",
        localField: "communes._id",
        foreignField: "commune",
        as: "zones"
    }},
    { $unwind: "$zones" },
    { $lookup: { 
        from: "ecoles",
        localField: "zones._id",
        foreignField: "zone",
        as: "ecoles"
    }},
    { $unwind: "$ecoles" },
    { $project: { _id: "$ecoles._id", nom: "$ecoles.nom", adresse: "$ecoles.adresse" } }
  ]).then(ecoles => {
    res.status(200).json(ecoles);
  }).catch(error => {
    res.status(500).json({ error });
  });
};


exports.getEcolesByCommune = async (req, res) => {
  const communeId = req.params.communeId; // Supposons que l'ID du district est passé comme paramètre dans l'URL

  Commune.aggregate([
    { $match: { _id: ObjectId(communeId) } },
      { $lookup: { 
        from: "zones",
        localField: "communes._id",
        foreignField: "commune",
        as: "zones"
    }},
    { $unwind: "$zones" },
    { $lookup: { 
        from: "ecoles",
        localField: "zones._id",
        foreignField: "zone",
        as: "ecoles"
    }},
    { $unwind: "$ecoles" },
    { $project: { _id: "$ecoles._id", nom: "$ecoles.nom", adresse: "$ecoles.adresse" } }
  ]).then(ecoles => {
    res.status(200).json(ecoles);
  }).catch(error => {
    res.status(500).json({ error });
  });
};

exports.getEcolesByZone = async (req, res) => {
  try {
    const zoneId = req.params.zoneId;
    const ecoles = await Ecole.find({ zone: zoneId });
    res.json(ecoles);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
