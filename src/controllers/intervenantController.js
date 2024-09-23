const db = require('../models');
const Intervenant = db.Intervenants;

exports.getAllIntervenants = async (req, res) => {
  try {
    const intervenants = await Intervenant.findAll();
    res.status(200).json(intervenants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIntervenantById = async (req, res) => {
  try {
    const intervenant = await Intervenant.findByPk(req.params.id);
    if (intervenant) {
      res.status(200).json(intervenant);
    } else {
      res.status(404).json({ error: 'Intervenant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createIntervenant = async (req, res) => {
  try {
    const newIntervenant = await Intervenant.create(req.body);
    res.status(201).json(newIntervenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIntervenant = async (req, res) => {
  try {
    const [updated] = await Intervenant.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedIntervenant = await Intervenant.findByPk(req.params.id);
      res.status(200).json(updatedIntervenant);
    } else {
      res.status(404).json({ error: 'Intervenant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteIntervenant = async (req, res) => {
  try {
    const rowsDeleted = await Intervenant.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Intervenant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
