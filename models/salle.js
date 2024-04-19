const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const ClasseEcole = require('../models/classeEcole');
const EleveSalle = require('../models/eleveSalle');

const salleSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true      
    },
    classeEcole: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClasseEcole' ,
            required: true         
    },
    eleveSalles:[{type: mongoose.Schema.Types.ObjectId, ref: 'EleveSalle'}]
});

// ----------------- middleware

salleSchema.post('save', async function (doc, next) {   
    await mongoose.model('ClasseEcole').findByIdAndUpdate(doc.classeEcole, { $addToSet: { salles: doc } });
   next();
});

  salleSchema.plugin(uniqueValidator);
  salleSchema.index({ "nom": 1,"classeEcole":1}, { unique: true });
module.exports= mongoose.model('Salle', salleSchema);