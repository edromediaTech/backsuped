const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Niveau = require('../models/niveau');
const ClasseEcole = require('../models/classeEcole');

const classeSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique:true
    },
    niveau: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Niveau' ,
            required: true         
    },
    classeMatieres:[{type: mongoose.Schema.Types.ObjectId, ref: 'ClasseMatiere'}],
    classeEcoles:[{type: mongoose.Schema.Types.ObjectId, ref: 'ClasseEcole'}]
});


classeSchema.plugin(uniqueValidator);
classeSchema.index({ "nom": 1,"niveau":1}, { unique: true });
const Classe = mongoose.model('Classe', classeSchema);

module.exports = Classe;
