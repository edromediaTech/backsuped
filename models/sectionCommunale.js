const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Commune = require('./commune');
const Ecole = require('./ecole');
const sectionCommunaleSchema = new mongoose.Schema({
   commune: { type: mongoose.Schema.Types.ObjectId, ref: 'Commune', required: true },
   nom: { type: String, required: true },
   ecoles:[{type: mongoose.Schema.Types.ObjectId, ref: 'Ecole'}],
   superficie: { type: Number, required: true },
   longitude: { type: Number, required: true },
   latitude: { type: Number, required: true },
   altitude: { type: Number, required: true }
});

sectionCommunaleSchema.plugin(uniqueValidator);
sectionCommunaleSchema.index({ "nom": 1,"commune":1}, { unique: true });
const SectionCommunale = mongoose.model('SectionCommunale', sectionCommunaleSchema);

module.exports = SectionCommunale;
