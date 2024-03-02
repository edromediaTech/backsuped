const mongoose = require('mongoose');
const Ecole = require('./ecole');

const categorieSchema = new mongoose.Schema({
  ecoles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ecole'
  }],
  categorie: { type: String, required: true }
});

module.exports = mongoose.model('Categorie', categorieSchema);
