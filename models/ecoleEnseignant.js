const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Enseignant= require('../models/enseignant');
const Ecole= require('../models/ecole');

const ecoleEnseignantSchema = new mongoose.Schema({
    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant',
        required: true
    },
    ecole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ecole',
        required: true
    },
    statut :String,
    nbChaire :Number,
    codeBud:String,
    dateNommination: Date, 
    dateAffectation: Date 
}, { timestamps: true });

ecoleEnseignantSchema.plugin(uniqueValidator);
ecoleEnseignantSchema.index({ "enseignant": 1,"ecole":1}, { unique: true });
const EcoleEnseignant = mongoose.model('EcoleEnseignant', ecoleEnseignantSchema);

module.exports = EcoleEnseignant;
