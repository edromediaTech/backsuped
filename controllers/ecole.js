// controllers/ecole.js
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Ecole = require('../models/ecole');
const Salle = require('../models/salle');
const Classe = require('../models/classe');
const Enseignant = require('../models/enseignant');
const District = require('../models/district');
const Departement= require('../models/departement');
const EcoleEnseignant = require('../models/ecoleEnseignant');
const Commune = require('../models/commune');
const Zone = require('../models/zone');
const SectionCommunale = require('../models/sectionCommunale');
// const Niveau = require('../models/niveau');

const { log } = require('../utils/logger');
const classeEcole = require('../models/classeEcole');


// exports.getEcoleFull = async (req, res) => {
//   try {
//       const ecoles = await Ecole.find()
//                                 .populate({
//                                     path: 'sectionCommunale',
//                                     populate: {
//                                         path: 'commune',
//                                         populate: {
//                                             path: 'district'
//                                         }
//                                     }
//                                 });
     
//       const ecolesFull = ecoles.map(ecole => ({
//           ...ecole,      
//           communeId: ecole.sectionCommunale.commune._id,        
//           districtId: ecole.sectionCommunale.commune.district._id,
         
//       }));

//       res.json(ecolesFull);
//   } catch (error) {
//       res.status(500).send({ message: error.message });
//   }
// };



exports.getEcoleCountPerDistrict = async (req, res) => {
 
  try {
    
    const url = req.headers.origin;
    const dept = await Departement.findOne({ url: url });
    const departementId = dept._id; // L'ID du département est passé dans la requête
    const departement = await Departement.findById(departementId).populate({
      path: 'districts',
      populate: {
        path: 'communes',
        populate: {
          path: 'sectionCommunales',
          populate: {
            path: 'ecoles'
          }
        }
      }
    });

    const results = departement.districts.map(district => ({
      districtName: district.nom,
      ecoleCount: district.communes.reduce((sum, commune) => sum + commune.sectionCommunales.reduce((sumSec, section) => sumSec + section.ecoles.length, 0), 0)
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.createEcole = async (req, res) => {
  
  try {
    const ecole = new Ecole(req.body);
    await ecole.save();
    res.status(201).json(ecole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// exports.InitializeEcole = async (req, res) => {
//   const ecole = await Ecole.findOne({_id: req.params.id}).populate("niveauenseignement")
//   const nivo = ecole.niveauenseignement.codeNiveau
//   const tnivo = await Niveau.find()
//   try {
//     const ecole = new Ecole(req.body);
//     await ecole.save();
//     res.status(201).json(ecole);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

exports.getEcolesParCommune = async (req, res) => {
  try {
    const { communeId } = req.params; // Obtenez l'ID de la commune depuis les paramètres de la route

    // Trouver toutes les zones appartenant à cette commune
    const zones = await Zone.find({ commune: communeId }).select('_id');
    const zoneIds = zones.map(zone => zone._id);

    // Trouver toutes les écoles dans les zones trouvées
    const ecoles = await Ecole.find({ zone: { $in: zoneIds } });
    
    res.json(ecoles);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

exports.getEnseignantsByEcole = async (req, res) => {
  
  try {
      const ecoleId = req.params.ecoleId;
      const ecoleWithEnseignants = await Ecole.findById(ecoleId).populate({
              path: 'ecoleEnseignants',
              populate: {
                  path: 'enseignant',
                  model: 'Enseignant', // Assurez-vous que le nom du modèle est correct
                  populate: {
                    path: 'personnel',
                    model: 'Personnel' // Assurez-vous que le nom du modèle est correct
              }
            }
          })
          .exec();

      if (!ecoleWithEnseignants) {
          return res.status(404).send('Ecole not found');
      }
     
      // Transformation des données pour envoyer uniquement ce qui est nécessaire
      const enseignants = ecoleWithEnseignants.ecoleEnseignants.map(ee => ({
          ecoleEnseignantId: ee._id,          
          nom:ee.enseignant.personnel.nom +" " +ee.enseignant.personnel.prenom,
          nif:ee.enseignant.personnel.nif, 
          telephone:ee.enseignant.personnel.telephone,         
      }));

      res.json(enseignants);
  } catch (error) {
      res.status(500).send(error.message);
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
    { $project: { _id: "$ecoles._id", nom: "$ecoles.nom", 
                  code: "$ecoles.code",
                  telephone: "$ecoles.tel",
                  email: "$ecoles.email", 
                  adresse: "$ecoles.adresse" } }
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
    const ecoles = await Ecole.find().
    populate({
      path: 'classeEcoles',
      populate: { path: 'salles', model: 'Salle'},
      populate: { path: 'classe', model: 'Classe'},
  })
    
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
