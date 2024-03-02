const mongoose = require('mongoose');
const Personnel = require('./personnel');

const enseignantSchema = new mongoose.Schema({    
    personnel: {type: mongoose.Schema.Types.ObjectId, ref: 'Personnel'},
    date_EFonction: { type: Date, required: true } // Date d'entrée en fonction
}, { timestamps: true });

const Enseignant = mongoose.model('Enseignant', enseignantSchema);

module.exports = Enseignant;
