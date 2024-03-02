const mongoose = require('mongoose');
const Groupe= require('../models/groupe');

const questionnaireSchema = new mongoose.Schema({
    groupe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Groupe',
        required: true
    },
    libelle: {
        type: String,
        required: true
    },
    type_q: {
        type: String,
        required: true
    },
    type_notation: {
        type: Number,
        required: true
    }
});

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;
