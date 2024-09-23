module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Maladie", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
    },
    description: {
      type: DataTypes.TEXT("tiny"),
    },
  });
};
