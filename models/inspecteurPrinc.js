// models/Inspecteur_zone.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const District = require('./district');
const Personnel = require('./personnel');

const inspecteurPrincSchema = new mongoose.Schema({
    personnel: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', required: true },
    district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
    type: {type:String, required:true},
    date_affectation: { type: Date, default: Date.now }
});

inspecteurPrincSchema.plugin(uniqueValidator);
inspecteurPrincSchema.index({ "personnel": 1,"district":1}, { unique: true });
module.exports =mongoose.model('InspecteurPrinc', inspecteurPrincSchema);


