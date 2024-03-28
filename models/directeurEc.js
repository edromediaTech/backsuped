// models/Inspecteur_zone.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Ecole = require('./ecole');
const Niveauenseignement = require('./niveauenseignement');
const Personnel = require('./personnel');

const directeurEcSchema = new mongoose.Schema({
    personnel: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', required: true },
    niveauenseignement: { type: mongoose.Schema.Types.ObjectId, ref: 'Niveauenseignement' },
    ecole: { type: mongoose.Schema.Types.ObjectId, ref: 'Ecole', required: true },    
    date_affectation: { type: Date, default: Date.now }
});

directeurEcSchema.plugin(uniqueValidator);
directeurEcSchema.index({ "personnel": 1,"ecole":1}, { unique: true });
module.exports =mongoose.model('DirecteurEc', directeurEcSchema);


