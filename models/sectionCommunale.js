const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const sectionCommunale = require('../models/sectionCommunale');
const Commune = require('../models/commune');
const Ecole = require('../models/ecole');
const sectionCommunaleSchema = new mongoose.Schema({
   commune: { type: mongoose.Schema.Types.ObjectId, ref: 'Commune', required: true },
   nom: { type: String, required: true },
   ecoles:[{type: mongoose.Schema.Types.ObjectId, ref: 'Ecole'}],
   superficie: { type: Number },
   longitude: { type: Number },
   latitude: { type: Number },
   altitude: { type: Number }
});

// ajoute le sectionCommunale dans le Commune
sectionCommunaleSchema.post('save', async function (doc, next) {
   await mongoose.model('Commune').findByIdAndUpdate(doc.commune, { $addToSet: { sectionCommunales: doc } });
   next();
 });
 
 // mis a jour le sectionCommunale dans le Commune
 
 sectionCommunaleSchema.pre('findOneAndUpdate', function(next) {
     this.set({ $set: { updatedAt: new Date() } }); // Exemple de mise à jour d'un champ
     this._updateCommune = this.getUpdate().Commune; // Stocker la nouvelle valeur de département si elle est présente
     next();
   });

 // verifie les tableaux vides
   sectionCommunaleSchema.pre('deleteOne', async function(next) {
     try {
         // Récupérer le document qui sera supprimé
         const doc = await this.model.findOne(this.getQuery());
 
         // Vérifier les champs de type tableau et s'assurer qu'ils sont vides
         const fieldsToCheck = ["ecoles"]; // Ajoutez les noms de vos champs de type tableau ici
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
 
 // supprime une sectionCommunale
   sectionCommunaleSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
     const doc = await this.model.findOne(this.getQuery());    
     // Ici, vous pouvez effectuer des actions avant la suppression du document,
     await mongoose.model('Commune').findByIdAndUpdate(doc.commune, { $pull: { sectionCommunales: doc._id } });
    // comme supprimer des références dans d'autres collections.  
     next();
   });
 

sectionCommunaleSchema.plugin(uniqueValidator);
sectionCommunaleSchema.index({ "nom": 1,"sectionCommunale":1}, { unique: true });
const SectionCommunale = mongoose.model('SectionCommunale', sectionCommunaleSchema);

module.exports = SectionCommunale;
