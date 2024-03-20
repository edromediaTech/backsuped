const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Questionnaire= require('../models/questionnaire');

const optionQuestionSchema = new mongoose.Schema({
    questionnaire: {type: mongoose.Schema.Types.ObjectId, ref: 'Questionnaire', required: true},
    libelle: {type: String, required: true}   
});

// ajoute le questionnaire dans le grouprquestionnaire
optionQuestionSchema.post('save', async function (doc, next) {
    await mongoose.model('Questionnaire').findByIdAndUpdate(doc.questionnaire, { $addToSet: { optionQuestions: doc } });
    next();
  });
  
  // mis a jour le optionQuestion dans le grouproptionQuestion
  
  optionQuestionSchema.pre('findOneAndUpdate', function(next) {
      this.set({ $set: { updatedAt: new Date() } }); // Exemple de mise à jour d'un champ
      this._updateQuestionnaire = this.getUpdate().questionnaire; // Stocker la nouvelle valeur de département si elle est présente
      next();
    });
  
   
  
    optionQuestionSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
      const doc = await this.model.findOne(this.getQuery());    
      // Ici, vous pouvez effectuer des actions avant la suppression du document,
      await mongoose.model('Questionnaire').findByIdAndUpdate(doc.questionnaire, { $pull: { optionQuestions: doc._id } });
      // comme supprimer des références dans d'autres collections.  
      next();
    });
  

optionQuestionSchema.plugin(uniqueValidator);
optionQuestionSchema.index({ "optionQuestion": 1,"libelle":1, "typeQ":1}, { unique: true });
module.exports = mongoose.model('OptionQuestion', optionQuestionSchema);