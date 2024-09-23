const db = require('../models');
const Saillie = db.Saillies;

exports.getAllSaillies = async (req, res) => {
  try {
    const saillies = await Saillie.findAll();
    res.status(200).json(saillies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSaillieById = async (req, res) => {
  try {
    const saillie = await Saillie.findByPk(req.params.id);
    if (saillie) {
      res.status(200).json(saillie);
    } else {
      res.status(404).json({ error: 'Saillie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSaillie = async (req, res) => {
  try {
    const newSaillie = await Saillie.create(req.body);
    res.status(201).json(newSaillie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSaillie = async (req, res) => {
  try {
    const [updated] = await Saillie.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedSaillie = await Saillie.findByPk(req.params.id);
      res.status(200).json(updatedSaillie);
    } else {
      res.status(404).json({ error: 'Saillie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSaillie = async (req, res) => {
  try {
    const rowsDeleted = await Saillie.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Saillie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
