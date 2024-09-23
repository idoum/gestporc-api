module.exports = (sequelize, DataTypes) => {
  const Remarque = sequelize.define("Remarque", {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT("tiny"),
      allowNull: false,
    },
    idPorc: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: "Porcs",
        key: "id",
      },
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

  return Remarque;
};
