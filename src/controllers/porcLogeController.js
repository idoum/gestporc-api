const db = require('../models');
const PorcLoge = db.PorcLoges;

exports.getAllPorcLoges = async (req, res) => {
  try {
    const porcLoges = await PorcLoge.findAll();
    res.status(200).json(porcLoges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPorcLogeById = async (req, res) => {
  try {
    const porcLoge = await PorcLoge.findByPk(req.params.id);
    if (porcLoge) {
      res.status(200).json(porcLoge);
    } else {
      res.status(404).json({ error: 'PorcLoge not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPorcLoge = async (req, res) => {
  try {
    const newPorcLoge = await PorcLoge.create(req.body);
    res.status(201).json(newPorcLoge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePorcLoge = async (req, res) => {
  try {
    const [updated] = await PorcLoge.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPorcLoge = await PorcLoge.findByPk(req.params.id);
      res.status(200).json(updatedPorcLoge);
    } else {
      res.status(404).json({ error: 'PorcLoge not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePorcLoge = async (req, res) => {
  try {
    const rowsDeleted = await PorcLoge.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'PorcLoge not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
