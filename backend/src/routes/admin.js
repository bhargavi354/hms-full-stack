const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Admin } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({
      where: { username: username.trim() },
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
