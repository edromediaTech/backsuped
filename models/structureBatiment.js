const mongoose = require('mongoose');

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
    reponse: {
        type: String,
        required: true
    }
});

const StructureBatiment = mongoose.model('StructureBatiment', structureBatimentSchema);

module.exports = StructureBatiment;
