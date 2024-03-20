const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Personnel= require('../models/personnel');
const Ecole= require('../models/ecole');

const responsableEcSchema = new mongoose.Schema({
    ecole: {type: mongoose.Schema.Types.ObjectId, ref: 'Ecole', required: true },
    personnel: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', required: true },
    niveau: {type: String, required: true },
    valider: { type: Boolean,  default: true },   
}, { timestamps: true });

responsableEcSchema.plugin(uniqueValidator);
responsableEcSchema.index({ "ecole": 1,"personnel":1, "niveau":1}, { unique: true });
module.exports = mongoose.model('ResponsableEc', responsableEcSchema);

 