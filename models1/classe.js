const mongoose = require('mongoose');
const Niveau = require('../models/niveau');

const classeSchema = new mongoose.Schema({
    nomclasse: {
        type: String,
        required: true,
        unique:true
    },
    niveau: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Niveau' ,
            required: true         
    }
});

const Classe = mongoose.model('Classe', classeSchema);

module.exports = Classe;
