const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const ClasseMatiere = require('../models/classeMatiere');
const Salle = require('../models/salle');
const Affectation = require('../models/affectation');

const classeMatiereSalleSchema = new mongoose.Schema({
   classeMatiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClasseMatiere',
        required: true
    },
    salle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salle',
        required: true
    },
    affectations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Affectation'}],
    nbheure: Number       
}, { timestamps: true });

// ajoute le classe matiere dans le classe
classeMatiereSalleSchema.post('save', async function (doc, next) {
    await mongoose.model('ClasseMatiere').findByIdAndUpdate(doc.classeMatiere, { $addToSet: { classeMatiereSalles: doc } });
    next();
  });

classeMatiereSalleSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    const doc = await this.model.findOne(this.getQuery());    
    // Ici, vous pouvez effectuer des actions avant la suppression du document,
    await mongoose.model('Classe').findByIdAndUpdate(doc.classe, { $pull: { classeMatieres: doc._id } });
    // comme supprimer des références dans d'autres collections.  
    next();
  });

classeMatiereSalleSchema.plugin(uniqueValidator);
classeMatiereSalleSchema.index({"classeMatiere":1,"salle":1}, { unique: true });
module.exports= mongoose.model('ClasseMatiereSalle', classeMatiereSalleSchema);

 
