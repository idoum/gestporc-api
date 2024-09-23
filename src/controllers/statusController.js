const db = require('../models');
const Status = db.Statuses;

exports.getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStatusById = async (req, res) => {
  try {
    const status = await Status.findByPk(req.params.id);
    if (status) {
      res.status(200).json(status);
    } else {
      res.status(404).json({ error: 'Status not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStatus = async (req, res) => {
  try {
    const newStatus = await Status.create(req.body);
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const [updated] = await Status.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedStatus = await Status.findByPk(req.params.id);
      res.status(200).json(updatedStatus);
    } else {
      res.status(404).json({ error: 'Status not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStatus = async (req, res) => {
  try {
    const rowsDeleted = await Status.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Status not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
