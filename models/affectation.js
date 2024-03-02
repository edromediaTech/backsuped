const mongoose = require('mongoose');
const ClasseMatiere= require('./classeMatiere');
const EcoleEnseignant= require('./ecoleEnseignant');

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


const Affectation = mongoose.model('Affectation', affectationSchema);
module.exports = Affectation;
