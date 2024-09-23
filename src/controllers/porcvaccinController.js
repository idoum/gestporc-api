const db = require("../models");
const PorcVaccin = db.PorcVaccins;

exports.getAllPorcVaccins = async (req, res) => {
  try {
    const porcvaccins = await PorcVaccin.findAll();
    res.status(200).json(porcvaccins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPorcVaccinById = async (req, res) => {
  try {
    const porcvaccin = await PorcVaccin.findByPk(req.params.id);
    if (porcvaccin) {
      res.status(200).json(porcvaccin);
    } else {
      res.status(404).json({ error: "PorcVaccin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPorcVaccin = async (req, res) => {
  try {
    const newPorcVaccin = await PorcVaccin.create(req.body);
    res.status(201).json(newPorcVaccin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePorcVaccin = async (req, res) => {
  try {
    const [updated] = await PorcVaccin.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPorcVaccin = await PorcVaccin.findByPk(req.params.id);
      res.status(200).json(updatedPorcVaccin);
    } else {
      res.status(404).json({ error: "PorcVaccin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePorcVaccin = async (req, res) => {
  try {
    const rowsDeleted = await PorcVaccin.destroy({
      where: { id: req.params.id },
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "PorcVaccin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
