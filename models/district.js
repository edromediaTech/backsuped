const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//const Departement= require('../models/departement');
const Departement = require('../models/departement')
const Commune= require('../models/commune');
const { log } = require('winston');

const districtSchema = new mongoose.Schema({
   departement: { type: mongoose.Schema.Types.ObjectId, ref: 'Departement', required: true },
   nom: { type: String, required: true },
   communes:[{type: mongoose.Schema.Types.ObjectId, ref: 'Commune'}],
   superficie: { type: Number },
   longitude: { type: Number },
   latitude: { type: Number },
   altitude: { type: Number }
});

//Activer les Middleware pour findOneAndUpdate
districtSchema.pre('findByIdAndUpdate', function(next) {
  this.setOptions({ runValidators: true, context: 'query' });
  next();
});

// ajoute le district dans le departement
districtSchema.post('save', async function (doc, next) {
  await mongoose.model('Departement').findByIdAndUpdate(doc.departement, { $addToSet: { districts: doc } });
  next();
});

// mis a jour le district dans le departement

districtSchema.pre('findOneAndUpdate', function(next) {
    this.set({ $set: { updatedAt: new Date() } }); // Exemple de mise à jour d'un champ
    this._updateDepartement = this.getUpdate().departement; // Stocker la nouvelle valeur de département si elle est présente
    next();
  });

  districtSchema.pre('deleteOne', async function(next) {
    try {
        // Récupérer le document qui sera supprimé
        const doc = await this.model.findOne(this.getQuery());

        // Vérifier les champs de type tableau et s'assurer qu'ils sont vides
        const fieldsToCheck = ["communes"]; // Ajoutez les noms de vos champs de type tableau ici
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


  districtSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    const doc = await this.model.findOne(this.getQuery());    
    // Ici, vous pouvez effectuer des actions avant la suppression du document,
    await mongoose.model('Departement').findByIdAndUpdate(doc.departement, { $pull: { districts: doc._id } });
    // comme supprimer des références dans d'autres collections.  
    next();
  });

districtSchema.plugin(uniqueValidator);
districtSchema.index({ "nom": 1,"departement":1}, { unique: true });
const District = mongoose.model('District', districtSchema);


module.exports = District;

