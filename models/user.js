const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Departement= require('../models/departement');

const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   departement: { type: mongoose.Schema.Types.ObjectId, ref: 'Departement', required: true },
   email: { type: String, required: true},
   apiToken: { type: String },
   userLevel: { type: Number, default: 0},
   emailVerified: { type: Date, default: null },
   lastSeen: { type: Date, default: null },
   password: { type: String, required: true },
   rememberToken: { type: String, default: null }
});

// ajoute le commune dans le district
userSchema.post('save', async function (doc, next) {
  await mongoose.model('Departement').findByIdAndUpdate(doc.departement, { $addToSet: { users: doc } });
  next();
});

// mis a jour le commune dans le district

userSchema.pre('findOneAndUpdate', function(next) {
    this.set({ $set: { updatedAt: new Date() } }); // Exemple de mise à jour d'un champ
    this._updateDepartement = this.getUpdate().departement; // Stocker la nouvelle valeur de département si elle est présente
    next();
  });


// supprime une commune
  userSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    const doc = await this.model.findOne(this.getQuery());    
    // Ici, vous pouvez effectuer des actions avant la suppression du document,
    await mongoose.model('Departement').findByIdAndUpdate(doc.departement, { $pull: { users: doc._id } });
   // comme supprimer des références dans d'autres collections.  
    next();
  });


userSchema.plugin(uniqueValidator);
userSchema.index({ "email": 1,"departement":1}, { unique: true });
const User = mongoose.model('User', userSchema);

module.exports = User;
