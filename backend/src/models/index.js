const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
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

// Load models
const Admin = require("./admin")(sequelize, DataTypes);
const Employee = require("./employee")(sequelize, DataTypes);
const Patient = require("./patient")(sequelize, DataTypes);
const Attendance = require("./attendance")(sequelize, DataTypes);
const Revenue = require("./revenue")(sequelize, DataTypes);
const OpBooking = require("./OpBooking")(sequelize, DataTypes);
const OpInvoice = require("./OpInvoice")(sequelize, DataTypes);
const Settings = require("./setting")(sequelize, DataTypes);

// Export all
module.exports = {
  sequelize,
  Admin,
  Employee,
  Patient,
  Attendance,
  Revenue,
  OpBooking,
  OpInvoice,
  Settings,
};
