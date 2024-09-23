module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Saillies", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    pere: {
      type: DataTypes.INTEGER(10),
    },
    mere: {
      type: DataTypes.INTEGER(10),
    },
    nombrePortee: {
      type: DataTypes.INTEGER(10),
    },
    nombreVivant: {
      type: DataTypes.INTEGER(10),
    },
    nombreMort: {
      type: DataTypes.INTEGER(10),
    },
    dateSaillie: {
      type: DataTypes.DATE,
    },
    dateMiseBas: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.INTEGER(1),
    },
    description: {
      type: DataTypes.TEXT("tiny"),
    },
  });
};
