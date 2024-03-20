// models/Inspecteur_zone.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Zone = require('./zone');
const Personnel = require('./personnel');

const inspecteurZoneSchema = new mongoose.Schema({
    personnel: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', required: true },
    zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
    date_affectation: { type: Date, default: Date.now }
});

inspecteurZoneSchema.plugin(uniqueValidator);
inspecteurZoneSchema.index({ "personnel": 1,"zone":1}, { unique: true });
module.exports =mongoose.model('InspecteurZone', inspecteurZoneSchema);


