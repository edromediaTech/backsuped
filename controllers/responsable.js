
const Responsable = require('../models/responsable');
const Personnel = require('../models/personnel');


// 3. Fonctions de contrôleur CRUD pour responsable

// Create
exports.createResponsable = async (req, res) => {
    
    auteur: req.auth.userId
    try {
        const pers = req.body;
        const personnel = await Personnel.create({...pers, user: req.auth.userId});
        const responsable = await Responsable.create({ personnel: personnel._id,niveauenseignement:pers.niveauenseignement,ecole:pers.ecole });
        res.status(201).json(responsable);
    } catch (error) {
       
        res.status(400).json({ message: error.message });
    }
};

// Read
exports.getAllResponsables = async (req, res) => {
    try {
        const responsables = await Responsable.find().populate('personnel');
        res.json(responsables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
exports.updateResponsable = async (req, res) => {
    try {
        const { id } = req.params;
        const responsable = await responsable.findByIdAndUpdate(id, req.body, { new: true });
        res.json(responsable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
exports.deleteResponsable = async (req, res) => {
    try {
        const { id } = req.params;
        await Responsable.findByIdAndDelete(id);
        res.json({ message: 'responsable deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



