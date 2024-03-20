const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const District= require('../models/district');
const Zone= require('../models/zone');
const SectionCommunale= require('../models/sectionCommunale');


const communeSchema = new mongoose.Schema({
   district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
   nom: { type: String, required: true },
   zones:[{type: mongoose.Schema.Types.ObjectId, ref: 'Zone'}],
   sectionCommunales:[{type: mongoose.Schema.Types.ObjectId, ref: 'SectionCommunale'}],
   superficie: { type: Number},
   longitude: { type: Number},
   latitude: { type: Number},
   altitude: { type: Number}
});

// ajoute le commune dans le district
communeSchema.post('save', async function (doc, next) {
   await mongoose.model('District').findByIdAndUpdate(doc.district, { $addToSet: { communes: doc } });
   next();
 });
 
 // mis a jour le commune dans le district
 
 communeSchema.pre('findOneAndUpdate', function(next) {
     this.set({ $set: { updatedAt: new Date() } }); // Exemple de mise à jour d'un champ
     this._updatedistrict = this.getUpdate().district; // Stocker la nouvelle valeur de département si elle est présente
     next();
   });

 // verifie les tableaux vides
   communeSchema.pre('deleteOne', async function(next) {
     try {
         // Récupérer le document qui sera supprimé
         const doc = await this.model.findOne(this.getQuery());
 
         // Vérifier les champs de type tableau et s'assurer qu'ils sont vides
         const fieldsToCheck = ["zones","sectionCommunales"]; // Ajoutez les noms de vos champs de type tableau ici
         const emptyFields = fieldsToCheck.filter(field => Array.isArray(doc[field]) && doc[field].length === 0);
 
         // Si des champs sont vides, autoriser la suppression, sinon renvoyer une erreur
         if (emptyFields.length > 0) {
             next();
         } else {
             throw new Error('Les champs de type tableau ne sont pas vides et ne peuvent pas être supprimés.');
         }
     } catch (error) {
         next(error);
     }
 });
 
 // supprime une commune
   communeSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
     const doc = await this.model.findOne(this.getQuery());    
     // Ici, vous pouvez effectuer des actions avant la suppression du document,
     await mongoose.model('District').findByIdAndUpdate(doc.district, { $pull: { communes: doc._id } });
    // comme supprimer des références dans d'autres collections.  
     next();
   });


communeSchema.plugin(uniqueValidator);
communeSchema.index({ "nom": 1,"commune":1}, { unique: true });
module.exports = mongoose.model('Commune', communeSchema);


