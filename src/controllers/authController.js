const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const User = db.User;
const Role = db.Role;

exports.register = async (req, res) => {
  try {
    const { username, password, nom, prenom, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      nom,
      prenom,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Configurez nodemailer pour envoyer l'e-mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      text: `You requested a password reset. Click the link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ message: error.message });
      }
      res.status(200).send({ message: "Password reset email sent." });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ message: "Current password is incorrect." });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).send({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Générer un code de réinitialisation aléatoire de 5 chiffres
function generateResetCode() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// Envoyer un e-mail avec nodemailer
async function sendEmail(email, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
}

exports.requestResetCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const resetCode = generateResetCode();
    user.resetCode = resetCode;
    user.resetCodeExpires = Date.now() + 3600000; // Code valide pendant 1 heure
    await user.save();

    await sendEmail(
      email,
      "Password Reset Code",
      `Your password reset code is: ${resetCode}`
    );

    res
      .status(200)
      .send({ message: "Password reset code sent to your email." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.verifyResetCode = async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;
    const user = await User.findOne({
      where: {
        email,
        resetCode,
        resetCodeExpires: {
          [Op.gt]: Date.now(),
        },
      },
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Invalid or expired reset code." });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.resetCode = null;
    user.resetCodeExpires = null;
    await user.save();

    res.status(200).send({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
