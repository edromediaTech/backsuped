const mongoose = require('mongoose');
const District= require('../models/district');
const User= require('../models/user');

const departementSchema = new mongoose.Schema({
   nom: { type: String, required: true, unique:true },
   url:{ type: String, default: "http://localhost:3000/" },
   districts:[{type: mongoose.Schema.Types.ObjectId, ref: 'District'}],
   users:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   superficie: { type: Number },
   longitude: { type: Number },
   latitude: { type: Number },
   altitude: { type: Number }
});


module.exports = mongoose.model('Departement', departementSchema);
