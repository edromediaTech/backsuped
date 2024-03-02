const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
    nomclasse: {
        type: String,
        required: true
    },
    niveau_id: {
        type: Number,
        required: true
    }
});

const Classe = mongoose.model('Classe', classeSchema);

module.exports = Classe;
