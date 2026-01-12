module.exports = (sequelize, DataTypes) => {
  const Revenue = sequelize.define("Revenue", {
    invoiceNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },

    // OP related (only for OP invoices)
    opId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doctor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visitTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // 🔥 IMPORTANT: identify source
    source: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ADMIN", // ADMIN / OP / HOME_VISIT
    },
  });

  return Revenue;
};
