const { Sequelize, DataTypes } = require("sequelize");

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};

db.sequelize = sequelize;

// Load all models WITH DataTypes
db.Admin = require("./admin")(sequelize, DataTypes);
db.Employee = require("./employee")(sequelize, DataTypes);
db.Patient = require("./patient")(sequelize, DataTypes);
db.Attendance = require("./attendance")(sequelize, DataTypes);
db.Revenue = require("./revenue")(sequelize, DataTypes);
db.HomeVisit = require("./homeVisit")(sequelize, DataTypes);
db.OpBooking = require("./OpBooking")(sequelize, DataTypes);
db.OpInvoice = require("./OpInvoice")(sequelize, DataTypes);
db.Settings = require("./setting")(sequelize, DataTypes);

module.exports = db;
