const mongoose = require('mongoose');
const District= require('../models/district');
const User= require('../models/user');

const departementSchema = new mongoose.Schema({
   nom: { type: String, required: true, unique:true },
   districts:[{type: mongoose.Schema.Types.ObjectId, ref: 'District'}],
   users:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   superficie: { type: Number, required: true },
   longitude: { type: Number, required: true },
   latitude: { type: Number, required: true },
   altitude: { type: Number, required: true }
});

const Departement = mongoose.model('Departement', departementSchema);

module.exports = Departement;
