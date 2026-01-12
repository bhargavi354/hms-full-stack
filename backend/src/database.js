// backend/src/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "hms_db",          // database name
  "postgres",        // username
  "postgres123",     // password
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;
