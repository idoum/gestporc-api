const db = require("../src/models");
const Role = db.Role;

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).send({ message: "Role Not Found." });
    }
    res.status(200).send(role);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { nom, description } = req.body;

    const role = await Role.create({
      nom,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).send({ message: "Role created successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).send({ message: "Role Not Found." });
    }

    const { nom, description } = req.body;

    await role.update({
      nom,
      description,
      updatedAt: new Date(),
    });

    res.status(200).send({ message: "Role updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).send({ message: "Role Not Found." });
    }

    await role.destroy();
    res.status(200).send({ message: "Role deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
