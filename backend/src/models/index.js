const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Employee   = require("./employee")(sequelize, DataTypes);
const Patient    = require("./patient")(sequelize, DataTypes);
const Attendance = require("./attendance")(sequelize, DataTypes);
const Revenue    = require("./revenue")(sequelize, DataTypes);
const HomeVisit  = require("./homeVisit")(sequelize, DataTypes);
const Admin      = require("./admin")(sequelize, DataTypes);
const OpBooking  = require("./OpBooking")(sequelize, DataTypes);

module.exports = {
  sequelize,
  Employee,
  Patient,
  Attendance,
  Revenue,
  HomeVisit,
  Admin,
  OpBooking,
};
