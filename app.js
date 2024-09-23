require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const db = require("./src/models");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const roleRoutes = require("./src/routes/roleRoutes");
const roleUserRoutes = require("./src/routes/roleUserRoutes");
const typeRoutes = require("./src/routes/typesRoutes");
const raceRoutes = require("./src/routes/raceRoutes");
const statusRoutes = require("./src/routes/statusRoutes");
const porcRoutes = require("./src/routes/porcRoutes");
const soinsRoutes = require('./src/routes/soinsRoutes');
const maladieRoutes = require('./src/routes/maladieRoutes');
const vaccinRoutes = require('./src/routes/vaccinRoutes');
const logeRoutes = require('./src/routes/logeRoutes');
const porcLogeRoutes = require('./src/routes/porcLogeRoutes');
const identifiantRoutes = require('./src/routes/identifiantRoutes');
const remarqueRoutes = require('./src/routes/remarqueRoutes');
const porcVaccinRoutes = require('./src/routes/porcvaccinRoutes');
const poidsRoutes = require('./src/routes/poidsRoutes');
const intervenantsRoutes = require('./src/routes/intervenantRoutes');
const sailliesRoutes = require('./src/routes/sailliesRoutes');

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/gest-porc/auth", authRoutes);
app.use("/gest-porc/users", userRoutes);
app.use("/gest-porc/roles", roleRoutes);
app.use("/gest-porc/roleusers", roleUserRoutes);
app.use("/gest-porc/types", typeRoutes);
app.use("/gest-porc/races", raceRoutes);
app.use("/gest-porc/statuses", statusRoutes);
app.use("/gest-porc/porcs", porcRoutes);
app.use('/gest-porc/soins', soinsRoutes);
app.use('/gest-porc/maladies', maladieRoutes);
app.use('/gest-porc/vaccins', vaccinRoutes);
app.use('/gest-porc/loges', logeRoutes);
app.use('/gest-porc/porcloges', porcLogeRoutes);
app.use('/gest-porc/identifiants', identifiantRoutes);
app.use('/gest-porc/remarques', remarqueRoutes);
app.use('/gest-porc/porcvaccins', porcVaccinRoutes);
app.use('/gest-porc/poids', poidsRoutes);
app.use('/gest-porc/intervenants', intervenantsRoutes);
app.use('/gest-porc/saillies', sailliesRoutes);

db.sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
