const Departement = require('../models/departement');

// Méthode pour récupérer tous les départements
exports.getAllDepartements = async (req, res) => {
    try {
        const departements = await Departement.find();
        res.json(departements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDepartementById = async (req, res) => {
    try {
        const departement = await Departement.findById(req.params.id)
            .populate({
                path: 'districts',
                populate: {
                    path: 'communes',
                    populate: [
                        {
                            path: 'sectionCommunales',
                            populate: { path: 'ecoles' } // Assumant que sectionCommunales a une référence aux ecoles
                        },
                        {
                            path: 'zones',
                            populate: { path: 'ecoles' } // Assumant que zones a aussi une référence aux ecoles
                        }
                    ]
                }
            });

        if (!departement) {
            return res.status(404).send('Le département demandé n\'a pas été trouvé.');
        }

        res.json(departement);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération du département: ' + error.message);
    }
};

// Méthode pour créer un nouveau département
exports.createDepartement = async (req, res) => {
    const departement = new Departement(req.body);
    try {
        const newDepartement = await departement.save();
        res.status(201).json(newDepartement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
