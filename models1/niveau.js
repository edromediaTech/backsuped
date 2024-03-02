const mongoose = require('mongoose');


const niveauSchema = new mongoose.Schema({
    libelle: {
        type: String,
        required: true,
        unique:true
    }
});

const Niveau = mongoose.model('Niveau', niveauSchema);

module.exports = Niveau;
