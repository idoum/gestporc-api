const db = require('../models');
const RoleUser = db.RoleUser;

exports.getAllRoleUsers = async (req, res) => {
  try {
    const roleUsers = await RoleUser.findAll({
      include: [
        { model: db.Role },
        { model: db.User }
      ]
    });
    res.status(200).send(roleUsers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getRoleUserById = async (req, res) => {
  try {
    const roleUser = await RoleUser.findByPk(req.params.id, {
      include: [
        { model: db.Role },
        { model: db.User }
      ]
    });
    if (!roleUser) {
      return res.status(404).send({ message: 'RoleUser Not Found.' });
    }
    res.status(200).send(roleUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createRoleUser = async (req, res) => {
  try {
    const { idRole, idUser, description } = req.body;

    const roleUser = await RoleUser.create({
      idRole,
      idUser,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).send({ message: 'RoleUser created successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateRoleUser = async (req, res) => {
  try {
    const roleUser = await RoleUser.findByPk(req.params.id);
    if (!roleUser) {
      return res.status(404).send({ message: 'RoleUser Not Found.' });
    }

    const { idRole, idUser, description } = req.body;

    await roleUser.update({
      idRole,
      idUser,
      description,
      updatedAt: new Date(),
    });

    res.status(200).send({ message: 'RoleUser updated successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteRoleUser = async (req, res) => {
  try {
    const roleUser = await RoleUser.findByPk(req.params.id);
    if (!roleUser) {
      return res.status(404).send({ message: 'RoleUser Not Found.' });
    }

    await roleUser.destroy();
    res.status(200).send({ message: 'RoleUser deleted successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
