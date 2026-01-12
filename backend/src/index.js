const express = require("express");
const cors = require("cors");
const { sequelize, Admin } = require("./models");

const app = express();

app.use(cors());

// 🔥 IMPORTANT FIX (IMAGE SAVE ISSUE)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get("/", (req, res) => {
  res.send("HMS Backend Running ✅");
});

// Routes
app.use("/api/employees", require("./routes/employees"));
app.use("/api/patients", require("./routes/patients"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/revenue", require("./routes/revenue"));
app.use("/api/op-revenue", require("./routes/opRevenue"));
app.use("/api/home-visits", require("./routes/homeVisits"));
app.use("/api/settings", require("./routes/settings"));
app.use("/api/login", require("./routes/admin"));
app.use("/api/op", require("./routes/op"));

(async () => {
  try {
    await sequelize.sync(); // ✅ SAFE
    console.log("✅ DB synced (SAFE MODE)");

    const ADMIN_USER = process.env.ADMIN_USER || "admin";
    const ADMIN_PASS = process.env.ADMIN_PASS || "12345";

    const exists = await Admin.findOne({
      where: { username: ADMIN_USER },
    });

    if (!exists) {
      await Admin.create({
        username: ADMIN_USER,
        password: ADMIN_PASS,
      });
      console.log("⭐ Default admin created");
    } else {
      console.log("✅ Admin already exists");
    }

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Backend start failed:", err);
  }
})();
