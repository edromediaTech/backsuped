// controllers/CategorieController.js
const Categorie = require('../models/categorie');

exports.categorieCreate = async (req, res) => {
  try {
    const categorie = new Categorie(req.body);
    await categorie.save();
    res.status(201).json(categorie);
} catch (error) {
    res.status(500).json({ message: error.message });
} 
};

exports.categoriesCreate = async (req, res) => {
  try {
    // Vérifiez si la requête contient un tableau de communes
    if (!req.body || !Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Invalid request body. Array of communes expected.' });
    }

    // Créez les communes à partir du tableau reçu
    const categories = await Categorie.create(req.body);

    // Répondre avec les districts créés
    res.status(201).json(categories);
} catch (error) {
    // En cas d'erreur, renvoyer une réponse d'erreur
    res.status(500).json({ error: 'An error occurred while creating districts.', details: error.message });
}
};

exports.getAllCategorie = async (req, res) => {
  try {
      const categories = await Categorie.find();
      res.json(categories);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};