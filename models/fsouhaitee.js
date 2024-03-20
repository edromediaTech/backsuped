const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Enseignant = require('../models/enseignant');

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

fsouhaiteeSchema.plugin(uniqueValidator);
fsouhaiteeSchema.index({ "titre": 1,"enseignant":1}, { unique: true });
const Fsouhaitee = mongoose.model('Fsouhaitee', fsouhaiteeSchema);

module.exports = Fsouhaitee;
