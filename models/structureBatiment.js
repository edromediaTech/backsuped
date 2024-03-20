const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Questionnaire= require('../models/questionnaire');
const OptionQuestion= require('../models/optionQuestion');

const structureBatimentSchema = new mongoose.Schema({
    ecole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ecole',
        required: true
    },
    questionnaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questionnaire',
        required: true
    },
    dateEvaluation: {
        type: Date,
        required: true
    },
    optionQuestion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OptionQuestion',
        required: true}
});


const StructureBatiment = mongoose.model('StructureBatiment', structureBatimentSchema);

module.exports = StructureBatiment;
