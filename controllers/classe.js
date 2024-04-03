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

  exports.getMatieresByClasse = async (req, res) => {
    try {
      const { classeId } = req.params;
      const classeWithMatieres = await Classe.findById(classeId)
        .populate({
          path: 'classeMatieres',
          populate: {
            path: 'matiere',
            model: 'Matiere'
          }
        })
        .exec();
  
      if (!classeWithMatieres) {
        return res.status(404).send('Classe not found');
      }
  
      // Extraire et renvoyer uniquement les matières de la classe
      const matieres = classeWithMatieres.classeMatieres.map(cm => ({
        _id: cm._id,
        libelle: cm.matiere.libelle // Assumant que votre modèle Matiere a un champ 'nom'
    }))
      res.json(matieres)
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  