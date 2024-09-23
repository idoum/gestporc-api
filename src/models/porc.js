module.exports = (sequelize, DataTypes) => {
  const Porc = sequelize.define("Porc", {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    idRace: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: "races",
        key: "id",
      },
    },
    idType: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: "types",
        key: "id",
      },
    },
    idStatus: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: "statuses",
        key: "id",
      },
    },
    idUser: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    numero: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    poids: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT("tiny"),
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Porc;
};
