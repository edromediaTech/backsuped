const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
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
        type: String
    },
    anac: {
        type: String,
        required: true
    }
}, { timestamps: true });

classEleveSchema.plugin(uniqueValidator);
classEleveSchema.index({ "ecole": 1,"classe":1,"eleve":1}, { unique: true });
const ClassEleve = mongoose.model('ClassEleve', classEleveSchema);

module.exports = ClassEleve;
