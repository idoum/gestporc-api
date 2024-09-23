module.exports = (sequelize, DataTypes) => {
  const PorcVaccin = sequelize.define("PorcVaccin", {
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
    idVaccin: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: "Vaccins",
        key: "id",
      },
    },
    dateVaccination: {
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

  return PorcVaccin;
};
