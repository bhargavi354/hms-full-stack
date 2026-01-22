const { Sequelize } = require("sequelize");

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
const Admin = require("./admin")(sequelize);
const Employee = require("./employee")(sequelize);
const Patient = require("./patient")(sequelize);
const Attendance = require("./attendance")(sequelize);
const Revenue = require("./revenue")(sequelize);
const HomeVisit = require("./homeVisit")(sequelize);
const OpBooking = require("./OpBooking")(sequelize);
const OpInvoice = require("./OpInvoice")(sequelize);

// Export everything
module.exports = {
  sequelize,
  Admin,
  Employee,
  Patient,
  Attendance,
  Revenue,
  HomeVisit,
  OpBooking,
  OpInvoice,
};
