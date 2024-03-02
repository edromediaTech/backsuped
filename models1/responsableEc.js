const mongoose = require('mongoose');
const User= require('../models/user');
const Ecole= require('../models/ecole');

const responsableEcSchema = new mongoose.Schema({
    ecole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ecole',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    niveau: {
        type: String,
        required: true
    },
    valider: {
        type: Number,
        required: true
    },
    nif: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ResponsableEc = mongoose.model('ResponsableEc', responsableEcSchema);

module.exports = ResponsableEc;
