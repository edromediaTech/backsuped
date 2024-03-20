const GroupeForm = require('../models/groupeForm');

// Ajouter un nouveau GroupeForm
exports.addGroupeForm = async (req, res) => {
    
    try {
        const groupeForm = new GroupeForm(req.body);
        await groupeForm.save();
        res.status(201).send(groupeForm);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Récupérer tous les GroupeForms
exports.getAllGroupeForms = async (req, res) => {
    try {
        const groupeForms = await GroupeForm.find().populate('forms').populate('departement');
        res.status(200).send(groupeForms);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Les autres contrôleurs pour mettre à jour, supprimer, etc., peuvent être ajoutés ici.
