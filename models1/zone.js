const mongoose = require('mongoose');
const Commune = require('../models/commune');
const Ecole = require('../models/ecole');

const zoneSchema = new mongoose.Schema({
   commune: { type: mongoose.Schema.Types.ObjectId, ref: 'Commune', required: true },
   nom: { type: String, required: true },
   ecoles:[{type: mongoose.Schema.Types.ObjectId, ref: 'Ecole'}],
   superficie: { type: Number, required: true },
   longitude: { type: Number, required: true },
   latitude: { type: Number, required: true },
   altitude: { type: Number, required: true }
});

zoneSchema.plugin(uniqueValidator);
zoneSchema.index({ "nom": 1,"commune":1}, { unique: true });
const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
