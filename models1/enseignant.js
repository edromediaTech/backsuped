const mongoose = require('mongoose');

const enseignantSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    adresse: { type: String, required: true },
    dept_n: { type: String, required: true }, // Département de naissance
    dept_h: { type: String, required: true }, // Département d'habitation
    commune_n: { type: String, required: true }, // Commune de naissance
    commune: { type: String, required: true }, // Commune d'habitation
    lieunais: { type: String, required: true }, // Lieu de naissance
    statutmat: { type: String, required: true }, // Statut matrimonial
    email: { type: String, required: true },
    nif: { type: String, required: true },
    cin: { type: String, required: true },
    sexe: { type: Boolean, required: true },
    date_naissance: { type: Date, required: true },
    telephone: { type: String, required: true },
    date_EFonction: { type: Date, required: true } // Date d'entrée en fonction
}, { timestamps: true });

const Enseignant = mongoose.model('Enseignant', enseignantSchema);

module.exports = Enseignant;
