const db = require('../models');

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;
      const userRoles = await db.RoleUser.findAll({
        where: { idUser: userId },
        include: [db.Role],
      });

      const userRoleNames = userRoles.map(roleUser => roleUser.Role.nom);

      const hasRole = roles.some(role => userRoleNames.includes(role));

      if (!hasRole) {
        return res.status(403).send({ message: 'Access Denied' });
      }

      next();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
};

module.exports = checkRole;
