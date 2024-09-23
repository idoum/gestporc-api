const db = require('../models');
const Soins = db.Soins;

exports.getAllSoins = async (req, res) => {
  try {
    const soins = await Soins.findAll();
    res.status(200).json(soins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSoinsById = async (req, res) => {
  try {
    const soins = await Soins.findByPk(req.params.id);
    if (soins) {
      res.status(200).json(soins);
    } else {
      res.status(404).json({ error: 'Soins not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSoins = async (req, res) => {
  try {
    const newSoins = await Soins.create(req.body);
    res.status(201).json(newSoins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSoins = async (req, res) => {
  try {
    const [updated] = await Soins.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedSoins = await Soins.findByPk(req.params.id);
      res.status(200).json(updatedSoins);
    } else {
      res.status(404).json({ error: 'Soins not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSoins = async (req, res) => {
  try {
    const rowsDeleted = await Soins.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Soins not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
