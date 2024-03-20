// controllers/vacationController.js
const Vacation = require('../models/vacation');

exports.vacationCreate = async (req, res) => {
    try {
        const vacation = new Vacation(req.body);
        await vacation.save();
        res.status(201).json(vacation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
    
};

exports.vacationsCreate = async (req, res) => {
    try {
        // Vérifiez si la requête contient un tableau de communes
        if (!req.body || !Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Invalid request body. Array of communes expected.' });
        }

        // Créez les communes à partir du tableau reçu
        const vacations = await Vacation.create(req.body);

        // Répondre avec les districts créés
        res.status(201).json(vacations);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        res.status(500).json({ error: 'An error occurred while creating districts.', details: error.message });
    }
};

exports.getAllVacation = async (req, res) => {
  try {
      const vacations = await Vacation.find();
      res.json(vacations);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};