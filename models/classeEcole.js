const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Classe= require('../models/classe');
const Ecole= require('../models/ecole');
const Salle= require('../models/salle');


const classeEcoleSchema = new mongoose.Schema({
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: true
    },
    ecole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ecole',
        required: true
    },
    salles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Salle'}]
   
}, { timestamps: true });

// ajoute le classe matiere dans le classe
classeEcoleSchema.post('save', async function (doc, next) {  
    await mongoose.model('Ecole').findByIdAndUpdate(doc.ecole, { $addToSet: { classeEcoles: doc } });
    next();
  });

classeEcoleSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    const doc = await this.model.findOne(this.getQuery());    
    // Ici, vous pouvez effectuer des actions avant la suppression du document,
    await mongoose.model('classe').findByIdAndUpdate(doc.classe, { $pull: { classeEcoles: doc._id } });
    await mongoose.model('Ecole').findByIdAndUpdate(doc.ecole, { $pull: { classeEcoles: doc._id } });
    // comme supprimer des références dans d'autres collections.  
    next();
  });


classeEcoleSchema.plugin(uniqueValidator);
classeEcoleSchema.index({ "classe": 1,"ecole":1}, { unique: true });
module.exports = mongoose.model('ClasseEcole', classeEcoleSchema);


