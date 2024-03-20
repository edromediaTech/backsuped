// controllers/zone.js

const Zone = require('../models/zone');

exports.createZone = async (req, res) => {
  try {
    const zone = new Zone(req.body);
    await zone.save();
    res.status(201).send(zone);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllZones = async (req, res) => {
  try {
    const zones = await Zone.find({});
    res.send(zones);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getZoneById = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) {
      return res.status(404).send();
    }
    res.send(zone);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateZone = async (req, res) => {
  try {
    const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!zone) {
      return res.status(404).send();
    }
    res.send(zone);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteZone = async (req, res) => {
  try {
    const zone = await Zone.findByIdAndDelete(req.params.id);
    if (!zone) {
      return res.status(404).send();
    }
    res.send(zone);
  } catch (error) {
    res.status(500).send(error);
  }
};


// Contrôleur pour créer plusieurs zones à partir d'un tableau
exports.createZones = async (req, res) => {
  try {
      // Vérifiez si la requête contient un tableau de zones
      if (!req.body || !Array.isArray(req.body)) {
          return res.status(400).json({ error: 'Invalid request body. Array of zones expected.' });
      }

      // Créez les zones à partir du tableau reçu
      const zones = await Zone.create(req.body);

      // Répondre avec les districts créés
      res.status(201).json(zones);
  } catch (error) {
      // En cas d'erreur, renvoyer une réponse d'erreur
      res.status(500).json({ error: 'An error occurred while creating zones.', details: error.message });
  }
};
