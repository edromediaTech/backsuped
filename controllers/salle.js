const Salle = require('../models/salle');

exports.createSalle = async (req, res) => {
    try {
        
        const salle = new Salle(req.body);
        const savedSalle = await salle.save();
        res.status(201).json(savedSalle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};