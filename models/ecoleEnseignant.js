const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Enseignant= require('../models/enseignant');
const Ecole= require('../models/ecole');
const Affectation= require('../models/affectation');
const ClasseMatiere= require('../models/classeMatiere');
///const { Console } = require('winston/lib/winston/transports');

const ecoleEnseignantSchema = new mongoose.Schema({
    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant',
        required: true
    },
    ecole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ecole',
        required: true
    },
    affectations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Affectation'}],
    statut :String,
    nbChaire :String,
    codeBud:String,
    dateNommination: Date, 
    dateAffectation: Date 
}, { timestamps: true });

// ajoute le classe matiere dans le classe
ecoleEnseignantSchema.post('insertMany', async function (docs, next) {
  for (let i = 0; i < docs.length; i++){
    await mongoose.model('Ecole').findByIdAndUpdate(docs[i].ecole, { $addToSet: { ecoleEnseignants: docs[i] } });
    await mongoose.model('Enseignant').findByIdAndUpdate(docs[i].enseignant, { $addToSet: { ecoleEnseignants: docs[i] } });
   };
    next();
  });

ecoleEnseignantSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    const doc = await this.model.findOne(this.getQuery());    
    // Ici, vous pouvez effectuer des actions avant la suppression du document,
    await mongoose.model('Enseignant').findByIdAndUpdate(doc.enseignant, { $pull: { ecoleEnseignants: doc._id } });
    await mongoose.model('Ecole').findByIdAndUpdate(doc.ecole, { $pull: { ecoleEnseignants: doc._id } });
    // comme supprimer des références dans d'autres collections.  
    next();
  });


ecoleEnseignantSchema.plugin(uniqueValidator);
ecoleEnseignantSchema.index({ "enseignant": 1,"ecole":1}, { unique: true });
const EcoleEnseignant = mongoose.model('EcoleEnseignant', ecoleEnseignantSchema);

module.exports = EcoleEnseignant;
