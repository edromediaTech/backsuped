const mongoose = require('mongoose');
const Ecole = require('../models/ecole');
const Eleve = require('../models/eleve');
const Classe = require('../models/classe');

const classEleveSchema = new mongoose.Schema({
    ecole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ecole',
        required: true
    },
    eleve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Eleve',
        required: true
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: true
    },
    status: {
        type: String,
        required: true
    },
    anac: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ClassEleve = mongoose.model('ClassEleve', classEleveSchema);

module.exports = ClassEleve;
