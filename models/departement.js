const mongoose = require('mongoose');
const District= require('./district');
const User= require('./user');

const departementSchema = new mongoose.Schema({
   nom: { type: String, required: true, unique:true },
   url: String,
   districts:[{type: mongoose.Schema.Types.ObjectId, ref: 'District'}],
   users:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   superficie: { type: Number, required: true },
   longitude: { type: Number, required: true },
   latitude: { type: Number, required: true },
   altitude: { type: Number, required: true }
});

const Departement = mongoose.model('Departement', departementSchema);

module.exports = Departement;
