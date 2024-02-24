const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const District= require('../models/district');
const Zone= require('../models/zone');
const SectionCommunale= require('../models/sectionCommunale');


const communeSchema = new mongoose.Schema({
   district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
   nom: { type: String, required: true },
   zones:[{type: mongoose.Schema.Types.ObjectId, ref: 'Zone'}],
   sectionCommunales:[{type: mongoose.Schema.Types.ObjectId, ref: 'SectionCommunales'}],
   superficie: { type: Number, required: true },
   longitude: { type: Number, required: true },
   latitude: { type: Number, required: true },
   altitude: { type: Number, required: true }
});

communeSchema.plugin(uniqueValidator);
communeSchema.index({ "nom": 1,"district":1}, { unique: true });
const Commune = mongoose.model('Commune', communeSchema);

module.exports = Commune;
