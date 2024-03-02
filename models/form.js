const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    objectif: {
        type: String,
        required: true
    },
    date_debut: {
        type: Date,
        required: true
    },
    date_fin: {
        type: Date,
        required: true
    }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
