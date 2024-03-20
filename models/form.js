const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const GroupeForm = require('./groupeForm');
const Questionnaire = require('./questionnaire');

const formSchema = new mongoose.Schema({
    titre: { type: String, required: true, unique: true },
    groupeForm: {type: mongoose.Schema.Types.ObjectId, ref: 'GroupeForm',required: true},
    questionnaires: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Questionnaire', required: true}],
    description: { type: String },
    objectif: { type: String },
    date_debut: { type: Date, default:Date.now},
    date_fin: { type: Date , default:Date.now}
});

// ajoute le form dans le grouprForm
formSchema.post('save', async function (doc, next) {
    await mongoose.model('GroupeForm').findByIdAndUpdate(doc.groupeForm, { $addToSet: { forms: doc } });
    next();
  });
  
  // mis a jour le form dans le grouprForm
  
  formSchema.pre('findOneAndUpdate', function(next) {
      this.set({ $set: { updatedAt: new Date() } }); // Exemple de mise à jour d'un champ
      this._updateGroupeForm = this.getUpdate().groupeForm; // Stocker la nouvelle valeur de département si elle est présente
      next();
    });
  
    formSchema.pre('deleteOne', async function(next) {
      try {
          // Récupérer le document qui sera supprimé
          const doc = await this.model.findOne(this.getQuery());
  
          // Vérifier les champs de type tableau et s'assurer qu'ils sont vides
          const fieldsToCheck = []; // Ajoutez les noms de vos champs de type tableau ici
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
  
  
    formSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
      const doc = await this.model.findOne(this.getQuery());    
      // Ici, vous pouvez effectuer des actions avant la suppression du document,
      await mongoose.model('GroupeForm').findByIdAndUpdate(doc.groupeForm, { $pull: { forms: doc._id } });
      // comme supprimer des références dans d'autres collections.  
      next();
    });
  

formSchema.plugin(uniqueValidator);
formSchema.index({ "titre": 1,"groupeForm":1}, { unique: true });
module.exports = mongoose.model('Form', formSchema);
