module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Loge", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
    },
    numero: {
      type: DataTypes.INTEGER(10),
    },
    description: {
      type: DataTypes.TEXT("tiny"),
    },
  });
};
