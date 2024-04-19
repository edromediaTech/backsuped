// controllers/classeEcoleController.js
const ClasseEcole = require('../models/classeEcole');
const Salle = require('../models/salle');

exports.createClasseEcole = async (req, res) => {
    try {
        const classeEcole = new ClasseEcole(req.body);
        const savedClasseEcole = await classeEcole.save();
        const sal = new Salle({nom:"Salle 1", classeEcole:savedClasseEcole})
        await sal.save()
        res.status(201).json(savedClasseEcole);
    } catch (error) {
       
        res.status(400).json({ message: error.message });
    }
};
