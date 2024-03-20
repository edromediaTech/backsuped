const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
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

funiversitaireSchema.plugin(uniqueValidator);
funiversitaireSchema.index({ "titre": 1,"enseignant":1}, { unique: true });
const Funiversitaire = mongoose.model('Funiversitaire', funiversitaireSchema);

module.exports = Funiversitaire;
