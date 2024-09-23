module.exports = (sequelize, DataTypes) => {
  const Poids = sequelize.define("Poids", {
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
    dateMesure: {
      type: DataTypes.DATE,
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
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  return Poids;
};
