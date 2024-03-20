const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Form= require('./form');
const Departement= require('./departement');

const groupeFormSchema = new mongoose.Schema({
    forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true}],
    departement: { type: mongoose.Schema.Types.ObjectId, ref: 'Departement', required: true},
    titre: { type: String, required: true, unique: true }
});

module.exports= mongoose.model('GroupeForm', groupeFormSchema);

