const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const User= require('./user');

const personnelSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    adresse: { type: String },
    dept_n: { type: String }, // Département de naissance
    dept_h: { type: String }, // Département d'habitation
    commune_n: { type: String }, // Commune de naissance
    commune: { type: String }, // Commune d'habitation
    lieunais: { type: String }, // Lieu de naissance
    statutmat: { type: String }, // Statut matrimonial
    email: { type: String },
    nif: { type: String, required: true },
    cin: { type: String },
    sexe: { type: Boolean },
    date_naissance: { type: Date },
    telephone: { type: String },
    type: { type: Number }
}, { timestamps: true });

personnelSchema.plugin(uniqueValidator);
personnelSchema.index({ "nom": 1,"prenom":1, "nif":1}, { unique: true });
const Personnel = mongoose.model('Personnel', personnelSchema);

module.exports = Personnel;
