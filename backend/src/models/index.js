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

// Import models
const Admin = require("./admin")(sequelize, DataTypes);
const Patient = require("./patient")(sequelize, DataTypes);
const Employee = require("./employee")(sequelize, DataTypes);
const Attendance = require("./attendance")(sequelize, DataTypes);
const Revenue = require("./revenue")(sequelize, DataTypes);
const OpBooking = require("./OpBooking")(sequelize, DataTypes);
const OpInvoice = require("./OpInvoice")(sequelize, DataTypes);
const Settings = require("./setting")(sequelize, DataTypes);

// Export everything
module.exports = {
  sequelize,
  Admin,
  Patient,
  Employee,
  Attendance,
  Revenue,
  OpBooking,
  OpInvoice,
  Settings,
};
