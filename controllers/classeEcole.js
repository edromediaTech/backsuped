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

exports.getClassesAndSallesByEcole = async (req, res) => {
    try {
        const { ecoleId } = req.params;

        const classesEcole = await ClasseEcole.find({ ecole: ecoleId })
            .populate('classe')
            .populate('salles');

        if (!classesEcole || classesEcole.length === 0) {
            return res.status(404).json({ message: 'Aucune classe trouvée pour cette école' });
        }

        res.json(classesEcole);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
