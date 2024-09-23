module.exports = (sequelize, DataTypes) => {
  const PorcSoigner = sequelize.define("PorcSoigner", {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    idPorc: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: "Porcs",
        key: "id",
      },
    },
    idSoins: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: "Soins",
        key: "id",
      },
    },
    idMaladie: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: "maladies",
        key: "id",
      },
    },
    idIntervenant: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: "intervenants",
        key: "id",
      },
    },
    dateSoin: {
      type: DataTypes.DATE,
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

  return PorcSoigner;
};
