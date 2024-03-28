const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Personnel= require('./personnel');
const Ecole= require('./ecole');
const Niveauenseignement= require('./niveauenseignement');

const responsableSchema = new mongoose.Schema({
    ecole: {type: mongoose.Schema.Types.ObjectId, ref: 'Ecole', required: true },
    personnel: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', required: true },
    niveauenseignement: { type: mongoose.Schema.Types.ObjectId, ref: 'Niveauenseignement' },
    valider: { type: Boolean,  default: true },   
}, { timestamps: true });

responsableSchema.plugin(uniqueValidator);
responsableSchema.index({ "ecole": 1,"personnel":1, "niveau":1}, { unique: true });
module.exports = mongoose.model('Responsable', responsableSchema);

 