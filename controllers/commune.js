// communeController.js

const Commune = require('../models/commune');


    // Méthode pour créer une nouvelle commune
    exports.createCommune = async (req, res) => {
        try {
            const commune = new Commune(req.body);
            await commune.save();
            res.status(201).json(commune);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Méthode pour récupérer toutes les communes
    exports.getAllCommune = async (req, res) => {
        try {
            const communes = await Commune.find();
            res.json(communes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Méthode pour récupérer une commune par son ID
    exports.getByIdCommune  = async (req, res) => {
        try {
            const commune = await Commune.findById(req.params.id);
            if (!commune) {
                return res.status(404).json({ message: "Commune not found" });
            }
            res.json(commune);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Méthode pour mettre à jour une commune
    exports.updateCommune  = async (req, res) => {
        try {
            const commune = await Commune.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!commune) {
                return res.status(404).json({ message: "Commune not found" });
            }
            res.json(commune);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Méthode pour supprimer une commune
    exports.deleteCommune = async (req, res) => {
        try {
            const commune = await Commune.findByIdAndDelete(req.params.id);
            if (!commune) {
                return res.status(404).json({ message: "Commune not found" });
            }
            res.json({ message: "Commune deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

// Contrôleur pour créer plusieurs communes à partir d'un tableau
exports.createCommunes = async (req, res) => {
    try {
        // Vérifiez si la requête contient un tableau de communes
        if (!req.body || !Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Invalid request body. Array of communes expected.' });
        }

        // Créez les communes à partir du tableau reçu
        const communes = await Commune.create(req.body);

        // Répondre avec les districts créés
        res.status(201).json(communes);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        res.status(500).json({ error: 'An error occurred while creating districts.', details: error.message });
    }
};


