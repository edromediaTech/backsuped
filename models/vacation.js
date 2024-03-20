const mongoose = require('mongoose');
const Ecole = require('../models/ecole');

const vacationSchema = new mongoose.Schema({
  ecoles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ecole' }],
  nom: { type: String, required: true, unique:true }
});

module.exports = mongoose.model('Vacation', vacationSchema);
