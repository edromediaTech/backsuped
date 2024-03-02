const mongoose = require('mongoose');
const Enseignant = require('./enseignant');

const fsouhaiteeSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant',
        required: true
    }
}, { timestamps: true });

const Fsouhaitee = mongoose.model('Fsouhaitee', fsouhaiteeSchema);

module.exports = Fsouhaitee;
