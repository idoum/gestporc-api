const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Role = require("./role")(sequelize, Sequelize);
db.RoleUser = require("./roleUser")(sequelize, Sequelize);
db.Types = require('./types')(sequelize, Sequelize);
db.Races = require('./race')(sequelize, Sequelize);
db.Statuses = require('./status')(sequelize, Sequelize);
db.Porcs = require('./porc')(sequelize, Sequelize);
db.Identifiants = require('./identifiant')(sequelize, Sequelize);
db.Intervenants = require('./intervenant')(sequelize, Sequelize);
db.Loges = require('./loge')(sequelize, Sequelize);
db.Maladies = require('./maladie')(sequelize, Sequelize);
db.Poids = require('./poids')(sequelize, Sequelize);
db.PorcLoges = require('./porcloge')(sequelize, Sequelize);
db.Soins = require('./soins')(sequelize, Sequelize);
db.PorcSoigners = require('./porcsoigner')(sequelize, Sequelize);
db.Vaccins = require('./vaccin')(sequelize, Sequelize);
db.PorcVaccins = require('./porcvaccin')(sequelize, Sequelize);
db.Remarques = require('./remarque')(sequelize, Sequelize);
db.Saillies = require('./saillies')(sequelize, Sequelize);
db.User.belongsToMany(db.Role, { through: db.RoleUser, foreignKey: "idUser" });
db.Role.belongsToMany(db.User, { through: db.RoleUser, foreignKey: "idRole" });
db.Porcs.belongsTo(db.Types, { foreignKey: 'idType' });
db.Porcs.belongsTo(db.Races, { foreignKey: 'idRace' });
db.Porcs.belongsTo(db.User, { foreignKey: 'idUser' });
db.Porcs.belongsTo(db.Statuses, { foreignKey: 'idStatus' });
db.Identifiants.belongsTo(db.Porcs, { foreignKey: 'idPorc' });
db.PorcLoges.belongsTo(db.Porcs, { foreignKey: 'idPorc' });
db.PorcLoges.belongsTo(db.Loges, { foreignKey: 'idLoge' });
db.Poids.belongsTo(db.Porcs, { foreignKey: 'idPorc' });
db.Poids.belongsTo(db.User, { foreignKey: 'idUser' });
db.PorcSoigners.belongsTo(db.Porcs, { foreignKey: 'idPorc' });
db.PorcSoigners.belongsTo(db.Maladies, { foreignKey: 'idMaladie' });
db.PorcSoigners.belongsTo(db.Soins, { foreignKey: 'idSoins' });
db.PorcSoigners.belongsTo(db.Intervenants, { foreignKey: 'idIntervenant' });
db.PorcVaccins.belongsTo(db.Porcs, { foreignKey: 'idPorc' });
db.PorcVaccins.belongsTo(db.Vaccins, { foreignKey: 'idVaccin' });
db.Remarques.belongsTo(db.Porcs, { foreignKey: 'idPorc' });

module.exports = db;
