const mongoose = require('mongoose');
const Ecole = require('./ecole');

const vacationSchema = new mongoose.Schema({
  ecoles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ecole'
  }],
  vacation: { type: String, required: true }
});

module.exports = mongoose.model('Vacation', vacationSchema);
