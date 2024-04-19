const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Matiere = require('../models/matiere');
const Classe = require('../models/classe');
const ClasseMatiereSalle = require('../models/classeMatiereSalle');
const Affectation = require('../models/affectation');

const classeMatiereSchema = new mongoose.Schema({
   matiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere',
        required: true
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: true
    },
    classeMatiereSalles: [{type: mongoose.Schema.Types.ObjectId, ref: 'ClasseMatiereSalle'}],
    nbheure: Number       
}, { timestamps: true });

// ajoute le classe matiere dans le classe
classeMatiereSchema.post('save', async function (doc, next) {
    await mongoose.model('Classe').findByIdAndUpdate(doc.classe, { $addToSet: { classeMatieres: doc } });
    next();
  });

classeMatiereSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    const doc = await this.model.findOne(this.getQuery());    
    // Ici, vous pouvez effectuer des actions avant la suppression du document,
    await mongoose.model('Classe').findByIdAndUpdate(doc.classe, { $pull: { classeMatieres: doc._id } });
    // comme supprimer des références dans d'autres collections.  
    next();
  });

classeMatiereSchema.plugin(uniqueValidator);
classeMatiereSchema.index({"classe":1,"matiere":1}, { unique: true });
const ClasseMatiere = mongoose.model('ClasseMatiere', classeMatiereSchema);

module.exports = ClasseMatiere;
