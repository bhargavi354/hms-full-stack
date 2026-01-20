const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Admin } = require("../models");

// LOGIN API
router.post("/", async (req, res) => {
  try {
    console.log("🔐 Login attempt:", req.body);

    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    // 1️⃣ Find admin by username
    const admin = await Admin.findOne({
      where: { username: username.trim() },
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // 2️⃣ Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // 3️⃣ Success
    return res.json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (err) {
    console.error("❌ Admin login error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

module.exports = router;
