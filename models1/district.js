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

// ajoute le district dans le departement
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

// mis a jour le district dans le departement
districtSchema.pre('findOneAndUpdate', function(next) {
    this.set({ $set: { updatedAt: new Date() } }); // Exemple de mise à jour d'un champ
    this._updateDepartement = this.getUpdate().departement; // Stocker la nouvelle valeur de département si elle est présente
    next();
  });

// supprime le district dans le departement
districtSchema.pre('findOneAndDelete', async function(next) {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
      const departementId = doc.departement;
      // Supprimer la référence du district dans le document du département
      await mongoose.model('Departement').findByIdAndUpdate(departementId, {
        $pull: { districts: doc }
      });
    }
    next();
  });


districtSchema.plugin(uniqueValidator);
districtSchema.index({ "nom": 1,"departement":1}, { unique: true });
const District = mongoose.model('District', districtSchema);


module.exports = District;
