const District = require('../models/district');

// Récupérer tous les districts
exports.getAllDistricts = async (req, res) => {
    try {
        const districts = await District.find();
        res.json(districts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Créer un nouveau district
exports.createDistrict = async (req, res) => {
    const district = new District(req.body);
    try {
        const savedDistrict = await district.save();
        res.status(201).json(savedDistrict);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Mise à jour d'un district
exports.updateDistrict = async (req, res) => {
    try {
        const updatedDistrict = await District.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDistrict);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Supprimer un district
exports.deleteDistrict = async (req, res) => {
    try {      
        await District.deleteOne({_id:req.params.id});
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};


//---------------------------------------------------------------------

// Contrôleur pour créer plusieurs districts à partir d'un tableau
exports.createDistricts = async (req, res) => {
    try {
        // Vérifiez si la requête contient un tableau de districts
        if (!req.body || !Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Invalid request body. Array of districts expected.' });
        }

        // Créez les districts à partir du tableau reçu
        const districts = await District.create(req.body);

        // Répondre avec les districts créés
        res.status(201).json(districts);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        res.status(500).json({ error: 'An error occurred while creating districts.', details: error.message });
    }
};


