const mongoose = require('mongoose');
const User= require('../models/user');

const personnelSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    nif: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Personnel = mongoose.model('Personnel', personnelSchema);

module.exports = Personnel;
