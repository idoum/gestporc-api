const db = require("../models");
const Porc = db.Porcs;

exports.getAllPorcs = async (req, res) => {
  try {
    const porcs = await Porc.findAll();
    res.status(200).json(porcs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPorcById = async (req, res) => {
  try {
    const porc = await Porc.findByPk(req.params.id);
    if (porc) {
      res.status(200).json(porc);
    } else {
      res.status(404).json({ error: "Porc not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPorc = async (req, res) => {
  try {
    const newPorc = await Porc.create(req.body);
    res.status(201).json(newPorc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePorc = async (req, res) => {
  try {
    const [updated] = await Porc.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPorc = await Porc.findByPk(req.params.id);
      res.status(200).json(updatedPorc);
    } else {
      res.status(404).json({ error: "Porc not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePorc = async (req, res) => {
  try {
    const rowsDeleted = await Porc.destroy({
      where: { id: req.params.id },
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Porc not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
