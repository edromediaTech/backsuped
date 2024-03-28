const mongoose = require('mongoose');
const Personnel = require('../models/personnel');
const Formation = require('../models/formation');
const Funiversitaire = require('../models/funiversitaire');
const Fsouhaitee = require('../models/fsouhaitee');
const EcoleEnseignant = require('../models/ecoleEnseignant');

const enseignantSchema = new mongoose.Schema({    
    personnel: {type: mongoose.Schema.Types.ObjectId, ref: 'Personnel'},
    niveauClass:String,    
    niveauUniv:String,    
    certification:String,    
    formations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Formation'}],
    fsouhaitees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Fsouhaitee'}],
    funiversites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Funiversite'}],
    ecoleEnseigants: [{type: mongoose.Schema.Types.ObjectId, ref: 'EcoleEnseignant'}]
}, { timestamps: true });


const Enseignant = mongoose.model('Enseignant', enseignantSchema);
module.exports = Enseignant;
