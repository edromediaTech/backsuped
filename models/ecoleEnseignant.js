const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Enseignant= require('../models/enseignant');
const Ecole= require('../models/ecole');

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
    statut :String,
    nbChaire :String,
    codeBud:String,
    dateNommination: Date, 
    dateAffectation: Date 
}, { timestamps: true });

// ajoute le classe matiere dans le classe
ecoleEnseignantSchema.post('save', async function (doc, next) {
    await mongoose.model('Enseignant').findByIdAndUpdate(doc.enseignant, { $addToSet: { ecoleEnseignants: doc } });
    next();
  });

ecoleEnseignantSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    const doc = await this.model.findOne(this.getQuery());    
    // Ici, vous pouvez effectuer des actions avant la suppression du document,
    await mongoose.model('Enseignant').findByIdAndUpdate(doc.enseignant, { $pull: { ecoleEnseignants: doc._id } });
    // comme supprimer des références dans d'autres collections.  
    next();
  });


ecoleEnseignantSchema.plugin(uniqueValidator);
ecoleEnseignantSchema.index({ "enseignant": 1,"ecole":1}, { unique: true });
const EcoleEnseignant = mongoose.model('EcoleEnseignant', ecoleEnseignantSchema);

module.exports = EcoleEnseignant;
