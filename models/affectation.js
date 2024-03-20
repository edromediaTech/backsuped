const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const ClasseMatiere= require('../models/classeMatiere');
const EcoleEnseignant= require('../models/ecoleEnseignant');

const affectationSchema = new mongoose.Schema({
    ecoleEnseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EcoleEnseignant',
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
    date_affectation: {
        type: Date
    }
}, { timestamps: true });


affectationSchema.plugin(uniqueValidator);
affectationSchema.index({ "ecoleEnseignant": 1,"classeMatiere":1}, { unique: true });
const Affectation = mongoose.model('Affectation', affectationSchema);
module.exports = Affectation;
