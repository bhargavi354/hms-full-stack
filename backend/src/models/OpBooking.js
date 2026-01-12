module.exports = (sequelize, DataTypes) => {
  const OpBooking = sequelize.define(
    "OpBooking",
    {
      // 🔥 FIX 1: token must be STRING
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      patientName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
      },

      // 🔥 FIX 2: allow null for optional fields
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      problem: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      doctor: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      visitTime: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "time",
      },

      status: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
      },
    },
    {
      tableName: "OpBookings",
    }
  );

  return OpBooking;
};
