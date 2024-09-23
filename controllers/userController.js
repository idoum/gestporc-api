const db = require("../src/models");
const User = db.User;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    const { username, nom, prenom, email } = req.body;

    await user.update({
      username,
      nom,
      prenom,
      email,
      updatedAt: new Date(),
    });

    res.status(200).send({ message: "User updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    await user.destroy();
    res.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
