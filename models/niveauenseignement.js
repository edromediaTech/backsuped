const mongoose = require('mongoose');
const Ecole = require('./ecole');
const Ecole= require('./ecole');

const niveauenseignementSchema = new mongoose.Schema({
  ecoles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ecole'
  }],
  niveau: { type: String, required: true },
  codeNiveau: { type: String, required: true, maxlength: 4 }
});

module.exports = mongoose.model('Niveauenseignement', niveauenseignementSchema);
