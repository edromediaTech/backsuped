const mongoose = require('mongoose');
const Ecole = require('./ecole');
const Eleve = require('./eleve');
const Classe = require('./classe');

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
