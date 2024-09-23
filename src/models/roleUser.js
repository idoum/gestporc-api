module.exports = (sequelize, DataTypes) => {
  const RoleUser = sequelize.define("RoleUser", {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    idRole: {
      type: DataTypes.INTEGER(10),
    },
    idUser: {
      type: DataTypes.INTEGER(10),
    },
    description: {
      type: DataTypes.TEXT("tiny"),
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  RoleUser.associate = (models) => {
    RoleUser.belongsTo(models.Role, { foreignKey: "idRole" });
    RoleUser.belongsTo(models.User, { foreignKey: "idUser" });
  };

  return RoleUser;
};
