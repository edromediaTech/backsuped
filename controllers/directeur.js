// directeurController.js
const Directeur = require('./directeur');

// Create
exports.createDirecteur = async (req, res) => {
    try {
        const directeur = new Directeur(req.body);
        await directeur.save();
        res.status(201).json(directeur);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Read
exports.getDirecteurs = async (req, res) => {
    try {
        const directeurs = await Directeur.find();
        res.json(directeurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update
exports.updateDirecteur = async (req, res) => {
    try {
        const { id } = req.params;
        const directeur = await Directeur.findByIdAndUpdate(id, req.body, { new: true });
        if (!directeur) {
            return res.status(404).json({ message: 'Directeur not found' });
        }
        res.json(directeur);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete
exports.deleteDirecteur = async (req, res) => {
    try {
        const { id } = req.params;
        const directeur = await Directeur.findByIdAndDelete(id);
        if (!directeur) {
            return res.status(404).json({ message: 'Directeur not found' });
        }
        res.json({ message: 'Directeur deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
