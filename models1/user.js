const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Departement= require('../models/departement');

const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   departement: { type: mongoose.Schema.Types.ObjectId, ref: 'Departement', required: true },
   email: { type: String, required: true},
   apiToken: { type: String, required: true },
   userLevel: { type: Number, required: true },
   emailVerified: { type: Date, default: null },
   lastSeen: { type: Date, default: null },
   password: { type: String, required: true },
   rememberToken: { type: String, default: null }
});

// ajoute le user dans le departement
userSchema.post('save', async function(doc, next) {
   try {
       await Departement.findByIdAndUpdate(
           { _id: doc.departement }, // Assurez-vous que votre schéma user a un champ pour stocker l'ID du département
           { $push: { users: doc } },
           { new: true, useFindAndModify: false }
       );
       next();
   } catch (error) {
       next(error);
   }
});

// mis a jour le user dans le departement
userSchema.pre('findOneAndUpdate', function(next) {
    this.set({ $set: { updatedAt: new Date() } }); // Exemple de mise à jour d'un champ
    this._updateDepartement = this.getUpdate().departement; // Stocker la nouvelle valeur de département si elle est présente
    next();
  });

// supprime le user dans le departement
userSchema.pre('findOneAndDelete', async function(next) {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
      const departementId = doc.departement;
      // Supprimer la référence du user dans le document du département
      await mongoose.model('Departement').findByIdAndUpdate(departementId, {
        $pull: { users: doc }
      });
    }
    next();
  });



userSchema.plugin(uniqueValidator);
userSchema.index({ "email": 1,"departement":1}, { unique: true });
const User = mongoose.model('User', userSchema);

module.exports = User;
