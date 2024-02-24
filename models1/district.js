const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Departement= require('../models/departement');
const Commune= require('../models/commune');

const districtSchema = new mongoose.Schema({
   departement: { type: mongoose.Schema.Types.ObjectId, ref: 'Departement', required: true },
   nom: { type: String, required: true },
   communes:[{type: mongoose.Schema.Types.ObjectId, ref: 'Commune'}],
   superficie: { type: Number, required: true },
   longitude: { type: Number, required: true },
   latitude: { type: Number, required: true },
   altitude: { type: Number, required: true }
});

districtSchema.post('save', async function(doc, next) {
   try {
       await Departement.findByIdAndUpdate(
           { _id: doc.departement }, // Assurez-vous que votre schéma District a un champ pour stocker l'ID du département
           { $push: { districts: doc } },
           { new: true, useFindAndModify: false }
       );
       next();
   } catch (error) {
       next(error);
   }
});


districtSchema.plugin(uniqueValidator);
districtSchema.index({ "nom": 1,"departement":1}, { unique: true });
const District = mongoose.model('District', districtSchema);


module.exports = District;
