const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Eleve = require('../models/eleve');
const Salle = require('../models/salle');

const eleveSalleSchema = new mongoose.Schema({
 
    eleve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Eleve',
        required: true
    },
    salle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salle',
        required: true
    },
    status: {
        type: String
    },
    anac: {
        type: String,
        required: true
    }
}, { timestamps: true });

eleveSalleSchema.post('save', async function (doc, next) {
    await mongoose.model('Eleve').findByIdAndUpdate(doc.eleve, { $addToSet: { eleveSalles: doc } });
    await mongoose.model('Salle').findByIdAndUpdate(doc.salle, { $addToSet: { eleveSalles: doc } });
    next();
  });

eleveSalleSchema.plugin(uniqueValidator);
eleveSalleSchema.index({ "classe":1,"eleve":1}, { unique: true });
module.exports =mongoose.model('EleveSalle', eleveSalleSchema);


