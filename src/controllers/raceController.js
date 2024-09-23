const db = require('../models');
const { Op } = require('sequelize');
const Race = db.Races;

exports.getAllRaces = async (req, res) => {
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

    const { count, rows } = await Race.findAndCountAll(options);
    res.json({
      totalItems: count,
      Race: rows,
      totalPages: Math.ceil(count / size),
      currentPage: +page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRaceById = async (req, res) => {
  try {
    const race = await Race.findByPk(req.params.id);
    if (race) {
      res.status(200).json(race);
    } else {
      res.status(404).json({ error: 'Race not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRace = async (req, res) => {
  try {
    const newRace = await Race.create(req.body);
    res.status(201).json(newRace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRace = async (req, res) => {
  try {
    const [updated] = await Race.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRace = await Race.findByPk(req.params.id);
      res.status(200).json(updatedRace);
    } else {
      res.status(404).json({ error: 'Race not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRace = async (req, res) => {
  try {
    const rowsDeleted = await Race.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Race not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
