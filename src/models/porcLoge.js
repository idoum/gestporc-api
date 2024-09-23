module.exports = (sequelize, DataTypes) => {
  const PorcLoge = sequelize.define("PorcLoge", {
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
    idLoge: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: "Loges",
        key: "id",
      },
    },
    dateDebut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateFin: {
      type: DataTypes.DATE,
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

  return PorcLoge;
};
