// controllers/niveauenseignementController.js
const Niveauenseignement = require('../models/niveauenseignement');

exports.niveauenseignementCreate = async (req, res) => {
    try {
        // Vérifiez si la requête contient un tableau de communes
        if (!req.body || !Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Invalid request body. Array of niveau expected.' });
        }

        // Créez les communes à partir du tableau reçu
        const niveauenseignements = await Niveauenseignement.create(req.body);

        // Répondre avec les districts créés
        res.status(201).json(niveauenseignements);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        res.status(500).json({ error: 'An error occurred while creating districts.', details: error.message });
    }
};

exports.niveauenseignementsCreate = async (req, res) => {
    try {
        // Vérifiez si la requête contient un tableau de niveauenseignements
        if (!req.body || !Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Invalid request body. Array of niveauenseignements expected.' });
        }

        // Créez les communes à partir du tableau reçu
        const niveauenseignements = await Niveauenseignement.create(req.body);

        // Répondre avec les districts créés
        res.status(201).json(niveauenseignements);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        res.status(500).json({ error: 'An error occurred while creating districts.', details: error.message });
    }
};

exports.getAllNiveauenseignement = async (req, res) => {
    try {
        const niveauenseignements = await Niveauenseignement.find();
        res.json(niveauenseignements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
