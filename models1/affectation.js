const mongoose = require('mongoose');

const affectationSchema = new mongoose.Schema({
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
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: true
    },
    date_affectation: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Affectation = mongoose.model('Affectation', affectationSchema);

module.exports = Affectation;
