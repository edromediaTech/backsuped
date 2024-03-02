const mongoose = require('mongoose');
const Ecole = require('./ecole');
const Eleve = require('./eleve');
const Classe = require('./classe');

const classeMatiereSchema = new mongoose.Schema({
    ecole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ecole',
        required: true
    },
    matiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere',
        required: true
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: true
    },
    nbheure: {
        type: Number
    },
   
}, { timestamps: true });

const ClasseMatiere = mongoose.model('ClassEleve', classeMatiereSchema);

module.exports = ClasseMatiere;
