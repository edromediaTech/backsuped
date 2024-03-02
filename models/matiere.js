const mongoose = require('mongoose');


const matiereSchema = new mongoose.Schema({
    libelle: {
        type: String,
        required: true,
        unique:true
    }
});

const Matiere = mongoose.model('Matiere', matiereSchema);

module.exports = Matiere;