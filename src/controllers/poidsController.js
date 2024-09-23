const db = require('../models');
const Poids = db.Poids;

exports.getAllPoids = async (req, res) => {
  try {
    const poids = await Poids.findAll();
    res.status(200).json(poids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPoidsById = async (req, res) => {
  try {
    const poids = await Poids.findByPk(req.params.id);
    if (poids) {
      res.status(200).json(poids);
    } else {
      res.status(404).json({ error: 'Poids not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPoids = async (req, res) => {
  try {
    const newPoids = await Poids.create(req.body);
    res.status(201).json(newPoids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePoids = async (req, res) => {
  try {
    const [updated] = await Poids.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPoids = await Poids.findByPk(req.params.id);
      res.status(200).json(updatedPoids);
    } else {
      res.status(404).json({ error: 'Poids not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePoids = async (req, res) => {
  try {
    const rowsDeleted = await Poids.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Poids not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
