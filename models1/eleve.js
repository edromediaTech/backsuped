const mongoose = require('mongoose');
const User = require('../models/user');

const eleveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    datenais: {
        type: Date,
        required: true
    },
    dept_n: {
        type: String,
        required: false // Ajustez selon que le département de naissance soit obligatoire ou non
    },
    lieunais: {
        type: String,
        required: true
    },
    sexe: {
        type: Boolean,
        required: true
    },
    prenom_mere: {
        type: String,
        required: false // Ajustez en fonction de la nécessité de ce champ
    },
    tel_persrep: {
        type: String,
        required: false // Ajustez selon que le téléphone du représentant soit obligatoire ou non
    },
    deficience: {
        type: Boolean,
        required: true
    }
});

const Eleve = mongoose.model('Eleve', eleveSchema);

module.exports = Eleve;
