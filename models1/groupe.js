const mongoose = require('mongoose');
const Form= require('../models/form');

const groupeSchema = new mongoose.Schema({
    form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    titre: {
        type: String,
        required: true
    }
});

const Groupe = mongoose.model('Groupe', groupeSchema);

module.exports = Groupe;
