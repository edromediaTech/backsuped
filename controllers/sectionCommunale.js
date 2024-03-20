// sectionCommunaleController.js

const SectionCommunale = require('../models/sectionCommunale');



exports.createSectionCommunale= async (req, res) => {
        try {
            const sectionCommunale = new SectionCommunale(req.body);
            await sectionCommunale.save();
            res.status(201).json(sectionCommunale);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    exports.getAllSectionCommunale= async (req, res) => {
        try {
            const sectionsCommunales = await SectionCommunale.find().populate("commune");
            res.json(sectionsCommunales);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    exports.getByIdSectionCommunale= async (req, res) => {
        try {
            const sectionCommunale = await SectionCommunale.findById(req.params.id).populate('commune');
            if (!sectionCommunale) {
                return res.status(404).json({ message: "Section communale not found" });
            }
            res.json(sectionCommunale);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    exports.updateSectionCommunale= async (req, res) => {
        try {
            const sectionCommunale = await SectionCommunale.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!sectionCommunale) {
                return res.status(404).json({ message: "Section communale not found" });
            }
            res.json(sectionCommunale);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    exports.deleteSectionCommunale= async (req, res) => {
        try {
            const sectionCommunale = await SectionCommunale.findByIdAndDelete(req.params.id);
            if (!sectionCommunale) {
                return res.status(404).json({ message: "Section communale not found" });
            }
            res.json({ message: "Section communale deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

// Contrôleur pour créer plusieurs sectionCommunales à partir d'un tableau
exports.createSectionCommunales = async (req, res) => {
    try {
        // Vérifiez si la requête contient un tableau de sectionCommunales
        if (!req.body || !Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Invalid request body. Array of sectionCommunales expected.' });
        }

        // Créez les sectionCommunales à partir du tableau reçu
        const sectionCommunales = await SectionCommunale.create(req.body);

        // Répondre avec les districts créés
        res.status(201).json(sectionCommunales);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        res.status(500).json({ error: 'An error occurred while creating sectionCommunales.', details: error.message });
    }
};

    