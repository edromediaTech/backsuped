const mongoose = require('mongoose');
const Enseignant = require('../models/enseignant');

const formationSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    duree: {
        type: String,
        required: true
    },
    datefin: {
        type: Date,
        required: true
    },
    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant',
        required: true
    }
}, { timestamps: true });

const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;
