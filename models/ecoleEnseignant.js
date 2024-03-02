const mongoose = require('mongoose');
const Enseignant= require('./enseignant');
const Ecole= require('./ecole');

const ecoleEnseignantSchema = new mongoose.Schema({
    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant',
        required: true
    },
    ecole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ecole',
        required: true
    },
    statut :String,
    date_Aff: {
        type: Date
    }
}, { timestamps: true });

const EcoleEnseignant = mongoose.model('EcoleEnseignant', ecoleEnseignantSchema);

module.exports = EcoleEnseignant;
