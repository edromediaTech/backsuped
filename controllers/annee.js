//const {addNode,getPaysId, deleteNode, updateNode, getOne, getAll, getPathEcole} = require('../helper')
const logger = require('../utils/logger');
const Annee = require('../models/annee');
const Departement = require('../models/departement');
exports.createAnnee =async (req, res, next) => {
  const url = req.headers.origin   
  const dept = await Departement.findOne({url:url}) 
  const anneeObject = req.body;
  delete anneeObject._id;
  delete anneeObject._userId;
  const annee = new Annee({
      ...anneeObject,
      departement : dept._id
      // userId: req.auth.userId,
      // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  annee.save()
  .then(() => { 
    Departement.findOne({ _id: univ._id }, (err, departement) => {        
      if (universite) {
          universite.annees.push(annee);
          universite.save();
          res.status(201).json(annee)
      }
    });
  
  
  })
  .catch(error => { res.status(400).json( { error })})
};

