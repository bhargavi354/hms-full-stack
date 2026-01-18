require("dotenv").config();

const bcrypt = require("bcrypt");
const { Admin } = require("./models");

async function createAdmin() {
  try {
    const username = "admin";
    const password = bcrypt.hashSync("12345", 10);

    await Admin.upsert({ username, password });

    console.log("✅ Admin created/reset successfully");
  } catch (err) {
    console.log("Error:", err);
  }
}

createAdmin();
