const db = require('../models');
const Remarque = db.Remarques;

exports.getAllRemarques = async (req, res) => {
  try {
    const remarques = await Remarque.findAll();
    res.status(200).json(remarques);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRemarqueById = async (req, res) => {
  try {
    const remarque = await Remarque.findByPk(req.params.id);
    if (remarque) {
      res.status(200).json(remarque);
    } else {
      res.status(404).json({ error: 'Remarque not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRemarque = async (req, res) => {
  try {
    const newRemarque = await Remarque.create(req.body);
    res.status(201).json(newRemarque);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRemarque = async (req, res) => {
  try {
    const [updated] = await Remarque.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRemarque = await Remarque.findByPk(req.params.id);
      res.status(200).json(updatedRemarque);
    } else {
      res.status(404).json({ error: 'Remarque not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRemarque = async (req, res) => {
  try {
    const rowsDeleted = await Remarque.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Remarque not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
