const mongoose = require('mongoose');
const Enseignant = require('../models/enseignant');

const funiversitaireSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    datedebut: {
        type: Date,
        required: true
    },
    datefin: {
        type: Date,
        required: true
    },
    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant',
        required: true
    }
}, { timestamps: true });

const Funiversitaire = mongoose.model('Funiversitaire', funiversitaireSchema);

module.exports = Funiversitaire;
