const db = require('../models');
const { Op } = require('sequelize');
const Types = db.Types;

exports.getAllTypes = async (req, res) => {

  const { page = 1, size = 5, search = '' } = req.query;

  try {
    const options = {
      where: {
        nom: {
          [Op.like]: `%${search}%`
        }
      },
      limit: +size,
      offset: (+page - 1) * size
    };

    const { count, rows } = await Types.findAndCountAll(options);
    res.json({
      totalItems: count,
      types: rows,
      totalPages: Math.ceil(count / size),
      currentPage: +page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTypeById = async (req, res) => {
  try {
    const type = await Types.findByPk(req.params.id);
    if (type) {
      res.status(200).json(type);
    } else {
      res.status(404).json({ error: 'Type not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createType = async (req, res) => {
  try {
    const newType = await Types.create(req.body);
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateType = async (req, res) => {
  try {
    const [updated] = await Types.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedType = await Types.findByPk(req.params.id);
      res.status(200).json(updatedType);
    } else {
      res.status(404).json({ error: 'Type not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteType = async (req, res) => {
  try {
    const rowsDeleted = await Types.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Type not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
