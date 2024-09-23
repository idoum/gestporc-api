const db = require('../models');
const Identifiant = db.Identifiants;

exports.getAllIdentifiants = async (req, res) => {
  try {
    const identifiants = await Identifiant.findAll();
    res.status(200).json(identifiants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIdentifiantById = async (req, res) => {
  try {
    const identifiant = await Identifiant.findByPk(req.params.id);
    if (identifiant) {
      res.status(200).json(identifiant);
    } else {
      res.status(404).json({ error: 'Identifiant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createIdentifiant = async (req, res) => {
  try {
    const newIdentifiant = await Identifiant.create(req.body);
    res.status(201).json(newIdentifiant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIdentifiant = async (req, res) => {
  try {
    const [updated] = await Identifiant.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedIdentifiant = await Identifiant.findByPk(req.params.id);
      res.status(200).json(updatedIdentifiant);
    } else {
      res.status(404).json({ error: 'Identifiant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteIdentifiant = async (req, res) => {
  try {
    const rowsDeleted = await Identifiant.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Identifiant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
