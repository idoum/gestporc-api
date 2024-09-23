const db = require('../models');
const Vaccin = db.Vaccins;

exports.getAllVaccins = async (req, res) => {
  try {
    const vaccins = await Vaccin.findAll();
    res.status(200).json(vaccins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVaccinById = async (req, res) => {
  try {
    const vaccin = await Vaccin.findByPk(req.params.id);
    if (vaccin) {
      res.status(200).json(vaccin);
    } else {
      res.status(404).json({ error: 'Vaccin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createVaccin = async (req, res) => {
  try {
    const newVaccin = await Vaccin.create(req.body);
    res.status(201).json(newVaccin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVaccin = async (req, res) => {
  try {
    const [updated] = await Vaccin.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedVaccin = await Vaccin.findByPk(req.params.id);
      res.status(200).json(updatedVaccin);
    } else {
      res.status(404).json({ error: 'Vaccin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVaccin = async (req, res) => {
  try {
    const rowsDeleted = await Vaccin.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Vaccin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
