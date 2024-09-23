const db = require('../models');
const Maladie = db.Maladies;

exports.getAllMaladies = async (req, res) => {
  try {
    const maladies = await Maladie.findAll();
    res.status(200).json(maladies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMaladieById = async (req, res) => {
  try {
    const maladie = await Maladie.findByPk(req.params.id);
    if (maladie) {
      res.status(200).json(maladie);
    } else {
      res.status(404).json({ error: 'Maladie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMaladie = async (req, res) => {
  try {
    const newMaladie = await Maladie.create(req.body);
    res.status(201).json(newMaladie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMaladie = async (req, res) => {
  try {
    const [updated] = await Maladie.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedMaladie = await Maladie.findByPk(req.params.id);
      res.status(200).json(updatedMaladie);
    } else {
      res.status(404).json({ error: 'Maladie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMaladie = async (req, res) => {
  try {
    const rowsDeleted = await Maladie.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Maladie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
