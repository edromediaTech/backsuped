const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Zone= require('./zone');
const SectionCommunale= require('./sectionCommunale');
const Categorie= require('./categorie');
const Vacation= require('./vacation');
const Niveauenseignement= require('./niveauenseignement');

const ecoleSchema = new Schema({
  zone: {
    type: Schema.Types.ObjectId,
    ref: 'Zone', // Assurez-vous que ce nom correspond exactement à votre modèle de zone
    required: true
  },
  categorie: {
    type: Schema.Types.ObjectId,
    ref: 'Categorie', // Assurez-vous que ce nom correspond exactement à votre modèle de zone
    required: true
  },
  vacation: {
    type: Schema.Types.ObjectId,
    ref: 'Vacation', // Assurez-vous que ce nom correspond exactement à votre modèle de zone
    required: true
  },
  niveauenseignement: {
    type: Schema.Types.ObjectId,
    ref: 'Niveauenseignement', // Assurez-vous que ce nom correspond exactement à votre modèle de zone
    required: true
  },
  sectionCommunale: {
    type: Schema.Types.ObjectId,
    ref: 'SectionCommunale', // Assurez-vous que ce nom correspond à votre modèle de section communale
    required: true
  },
  nom: { type: String, required: true },
  code: { type: String, required: true, unique: true }, // code 11 chiffres du ministere
  sigle: String,
  tel: String,
  telephone: String,
  email: { type: String, lowercase: true },
  adresse: String,
  acces: String,
  secteur: { type: Number, min: 0, max: 255 }, // Utilise Number pour représenter tinyint
  milieu: { type: Boolean, default: false }, // Boolean pour milieu
  location: { type: Number, min: 0, max: 255 }, // Utilise Number pour représenter tinyint
  statut: { type: Number, min: 0, max: 255 }, // Utilise Number pour représenter tinyint, ajustez min et max selon vos besoins
  fondateur: String,
  latitude: Number,
  altitude: Number,
  longitude: Number
}, {
  timestamps: true // Ajoute createdAt et updatedAt automatiquement
});

//Activer les Middleware pour findOneAndUpdate
ecoleSchema.pre('findOneAndUpdate', function(next) {
    this.setOptions({ runValidators: true, context: 'query' });
    next();
  });
  
// Implémenter la Logique de Middleware pour Gérer les Changements de Références  
  ecoleSchema.pre('findOneAndUpdate', async function(next) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    const update = this.getUpdate();
  
    // Vérifier si la zone, categorie, vacation, Niveauenseignement ou la sectionCommunale est modifiée
    if (update.zone && !docToUpdate.zone.equals(update.zone)) {
      // Supprimer la référence de l'ancienne zone
      await mongoose.model('Zone').findByIdAndUpdate(docToUpdate.zone, { $pull: { ecoles: docToUpdate } });
      // Ajouter la référence à la nouvelle zone
      await mongoose.model('Zone').findByIdAndUpdate(update.zone, { $addToSet: { ecoles: update} });
    }

    if (update.categorie && !docToUpdate.categorie.equals(update.categorie)) {
      // Supprimer la référence de l'ancienne categorie
      await mongoose.model('Categorie').findByIdAndUpdate(docToUpdate.categorie, { $pull: { ecoles: docToUpdate } });
      // Ajouter la référence à la nouvelle categorie
      await mongoose.model('Categorie').findByIdAndUpdate(update.categorie, { $addToSet: { ecoles: update} });
    }
  
    if (update.vacation && !docToUpdate.vacation.equals(update.vacation)) {
      // Supprimer la référence de l'ancienne vacation
      await mongoose.model('Vacation').findByIdAndUpdate(docToUpdate.vacation, { $pull: { ecoles: docToUpdate } });
      // Ajouter la référence à la nouvelle vacation
      await mongoose.model('Vacation').findByIdAndUpdate(update.vacation, { $addToSet: { ecoles: update} });
    }
  
    if (update.niveauenseignement && !docToUpdate.niveauenseignement.equals(update.niveauenseignement)) {
      // Supprimer la référence de l'ancienne niveauenseignement
      await mongoose.model('Niveauenseignement').findByIdAndUpdate(docToUpdate.niveauenseignement, { $pull: { ecoles: docToUpdate } });
      // Ajouter la référence à la nouvelle niveauenseignement
      await mongoose.model('Niveauenseignement').findByIdAndUpdate(update.niveauenseignement, { $addToSet: { ecoles: update} });
    }
  
    if (update.sectionCommunale_id && !docToUpdate.sectionCommunale_id.equals(update.sectionCommunale)) {
      // Supprimer la référence de l'ancienne sectionCommunale
      await mongoose.model('SectionCommunale').findByIdAndUpdate(docToUpdate.sectionCommunale, { $pull: { ecoles: docToUpdate } });
      // Ajouter la référence à la nouvelle sectionCommunale
      await mongoose.model('SectionCommunale').findByIdAndUpdate(update.sectionCommunale, { $addToSet: { ecoles: update } });
    }
  
    next();
  });
  

//supprimer 
ecoleSchema.pre('remove', async function (next) {
    const doc = this;
    await mongoose.model('Zone').findByIdAndUpdate(doc.zone, { $pull: { ecoles: doc } });
    await mongoose.model('Categorie').findByIdAndUpdate(doc.categorie, { $pull: { ecoles: doc } });
    await mongoose.model('Vacation').findByIdAndUpdate(doc.vacation, { $pull: { ecoles: doc } });
    await mongoose.model('Niveauenseignement').findByIdAndUpdate(doc.niveauenseignement, { $pull: { ecoles: doc } });
    await mongoose.model('SectionCommunale').findByIdAndUpdate(doc.sectionCommunale, { $pull: { ecoles: doc._id } });
    next();
  });

  // ajouter
  ecoleSchema.post('save', async function (doc, next) {
    await mongoose.model('Zone').findByIdAndUpdate(doc.zone, { $addToSet: { ecoles: doc } });
    await mongoose.model('Categorie').findByIdAndUpdate(doc.categorie, { $addToSet: { ecoles: doc } });
    await mongoose.model('Vacation').findByIdAndUpdate(doc.vacation, { $addToSet: { ecoles: doc } });
    await mongoose.model('Niveauenseignement').findByIdAndUpdate(doc.niveauenseignement, { $addToSet: { ecoles: doc } });
    await mongoose.model('SectionCommunale').findByIdAndUpdate(doc.sectionCommunale, { $addToSet: { ecoles: doc } });
    next();
  });
  

const Ecole = mongoose.model('Ecole', ecoleSchema);

module.exports = Ecole;
