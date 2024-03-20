const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Form= require('../models/form');

const questionnaireSchema = new mongoose.Schema({
    form: {type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true},
    optionQuestions:[{type: mongoose.Schema.Types.ObjectId, ref: 'OptionQuestion'}],
    libelle: {type: String, required: true},
    typeQ: {type: String, required: true},
    typeNotation: {type: Number,  required: true }
});

// ajoute le form dans le grouprForm
questionnaireSchema.post('save', async function (doc, next) {
    await mongoose.model('Form').findByIdAndUpdate(doc.form, { $addToSet: { questionnaires: doc } });
    next();
  });
  
  // mis a jour le questionnaire dans le grouprquestionnaire
  
  questionnaireSchema.pre('findOneAndUpdate', function(next) {
      this.set({ $set: { updatedAt: new Date() } }); // Exemple de mise à jour d'un champ
      this._updateForm = this.getUpdate().form; // Stocker la nouvelle valeur de département si elle est présente
      next();
    });
  
   
  
    questionnaireSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
      const doc = await this.model.findOne(this.getQuery());    
      // Ici, vous pouvez effectuer des actions avant la suppression du document,
      await mongoose.model('Form').findByIdAndUpdate(doc.form, { $pull: { questionnaires: doc._id } });
      // comme supprimer des références dans d'autres collections.  
      next();
    });
  

questionnaireSchema.plugin(uniqueValidator);
questionnaireSchema.index({ "questionnaire": 1,"libelle":1, "typeQ":1}, { unique: true });
module.exports = mongoose.model('Questionnaire', questionnaireSchema);