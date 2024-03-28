
const DirecteurEc = require('../models/directeurEc');
const Personnel = require('../models/personnel');


// 3. Fonctions de contrôleur CRUD pour Directeur

// Create
exports.createDirecteur = async (req, res) => {
    
    auteur: req.auth.userId
    try {
        const pers = req.body;
        const personnel = await Personnel.create({...pers, user: req.auth.userId});
        const directeur = await DirecteurEc.create({ personnel: personnel._id,niveauenseignement:pers.niveauenseignement,ecole:pers.ecole ,date_EFonction: pers.date_EFonction });
        res.status(201).json(directeur);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message });
    }
};

// Read
exports.getAllDirecteurs = async (req, res) => {
    try {
        const directeurs = await DirecteurEc.find().populate('personnel');
        res.json(directeurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
exports.updateDirecteur = async (req, res) => {
    try {
        const { id } = req.params;
        const directeur = await DirecteurEc.findByIdAndUpdate(id, req.body, { new: true });
        res.json(directeur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
exports.deleteDirecteur = async (req, res) => {
    try {
        const { id } = req.params;
        await DirecteurEc.findByIdAndDelete(id);
        res.json({ message: 'Directeur deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



