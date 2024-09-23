const db = require('../models');
const Loge = db.Loges;

exports.getAllLoges = async (req, res) => {
  try {
    const loges = await Loge.findAll();
    res.status(200).json(loges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLogeById = async (req, res) => {
  try {
    const loge = await Loge.findByPk(req.params.id);
    if (loge) {
      res.status(200).json(loge);
    } else {
      res.status(404).json({ error: 'Loge not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLoge = async (req, res) => {
  try {
    const newLoge = await Loge.create(req.body);
    res.status(201).json(newLoge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLoge = async (req, res) => {
  try {
    const [updated] = await Loge.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedLoge = await Loge.findByPk(req.params.id);
      res.status(200).json(updatedLoge);
    } else {
      res.status(404).json({ error: 'Loge not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLoge = async (req, res) => {
  try {
    const rowsDeleted = await Loge.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Loge not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
