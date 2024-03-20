const mongoose = require('mongoose');
const Departement = require('../models/departement');
const uniqueValidator = require('mongoose-unique-validator');

const anneeSchema = mongoose.Schema({
  nom: {type: String, required: true, trim: true }, 
  departement: {type:mongoose.Schema.Types.ObjectId, ref:"Departement"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

anneeSchema.plugin(uniqueValidator);
anneeSchema.index({ "nom": 1, "departement": 1 }, { unique: true });

module.exports = mongoose.model('Annee', anneeSchema);