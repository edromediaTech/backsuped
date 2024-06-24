const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const ClasseMatiere= require('../models/classeMatiere');
const Salle= require('../models/salle');
const EcoleEnseignant= require('../models/ecoleEnseignant');

const affectationSchema = new mongoose.Schema({
    ecoleEnseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EcoleEnseignant',
        required: true
    },
    salle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salle',
        required: true
    },
    classeMatiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClasseMatiere',
        required: true
    },
    nbheuref: {
        type: Number
    },
    anac:String,
    dateAffectation: {
        type: Date
    }
}, { timestamps: true });

// ajoute le affectation ecoleEnseignant
affectationSchema.post('save', async function (doc, next) {
    await mongoose.model('EcoleEnseignant').findByIdAndUpdate(doc.ecoleEnseignant, { $addToSet: { affectations: doc } });
    await mongoose.model('ClasseMatiere').findByIdAndUpdate(doc.classeMatiere, { $addToSet: { affectations: doc } });
    next();
  });
  

affectationSchema.plugin(uniqueValidator);
affectationSchema.index({ "ecoleEnseignant": 1,"classeMatiere":1}, { unique: true });
const Affectation = mongoose.model('Affectation', affectationSchema);
module.exports = Affectation;
