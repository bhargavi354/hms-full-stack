require("dotenv").config();

const { Admin } = require("./models");

async function createAdmin() {
  try {
    const username = "admin";
    const password = "12345";

    await Admin.upsert({ username, password });

    console.log("✅ Admin created/reset successfully");
  } catch (err) {
    console.log("Error:", err);
  }
}

createAdmin();
