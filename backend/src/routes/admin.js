const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../models");
const Admin = db.Admin;

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    let admin = await Admin.findOne({ where: { username } });

    // 🔥 If no admin exists, auto create default admin
    if (!admin) {
      const hash = await bcrypt.hash("12345", 10);
      admin = await Admin.create({
        username: "admin",
        password: hash,
      });
      console.log("Admin auto created in DB");
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
