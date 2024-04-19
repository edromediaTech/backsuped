
const Enseignant = require('../models/enseignant');
const EcoleEnseignant = require('../models/ecoleEnseignant');
const Personnel = require('../models/personnel');


// 3. Fonctions de contrôleur CRUD pour Enseignant

// Create
exports.createEnseignant = async (req, res) => {
   console.log(req.body)
   try {
        const pers = req.body.enseignant;       
        const personnel = await Personnel.create({...pers});
        const enseignant = await Enseignant.create({ personnel: personnel._id,niveauClass:pers.niveauClass,niveauUniv:pers.niveauUniv ,certification: pers.certification });
        const ecolesEnseignantData = req.body.ecolesEnseignantData.map(ecoleEnseignant => ({
            ...ecoleEnseignant,
            enseignant: enseignant._id // Ajout de l'ID de l'enseignant
        }));  
           
        await EcoleEnseignant.insertMany(ecolesEnseignantData);
        //const ecoleEnseignant = await EcoleEnseignant.create({ enseignant: enseignant._id,ecole:pers.ecole,statut:pers.statut ,dateAffectation: pers.dateAffectation });
        res.status(201).json(enseignant);
    } catch (error) {
       
          res.status(400).json({ message: error.message });
    }
};

// Read
exports.getAllEnseignants = async (req, res) => {
    try {
        const enseignants = await Enseignant.find().populate('personnel');
        res.json(enseignants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
exports.updateEnseignant = async (req, res) => {
    try {
        const { id } = req.params;
        const enseignant = await Enseignant.findByIdAndUpdate(id, req.body, { new: true });
        res.json(enseignant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
exports.deleteEnseignant = async (req, res) => {
    try {
        const { id } = req.params;
        await Enseignant.findByIdAndDelete(id);
        res.json({ message: 'Enseignant deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



