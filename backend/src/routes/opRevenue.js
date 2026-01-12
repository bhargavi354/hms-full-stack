const express = require("express");
const router = express.Router();
const { Revenue } = require("../models");
const { Op } = require("sequelize");

// ===============================
// CREATE OP INVOICE
// POST /api/op-revenue
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      opId,
      token,
      patientName,
      doctor,
      visitTime,
      amount,
      status,
    } = req.body;

    if (!opId || !token || !patientName || !amount) {
      return res
        .status(400)
        .json({ message: "Required OP invoice fields missing" });
    }

    // 🔢 Generate invoice number
    const year = new Date().getFullYear();
    const last = await Revenue.findOne({
      where: {
        invoiceNo: { [Op.like]: `INV-${year}-%` },
      },
      order: [["id", "DESC"]],
    });

    let nextNo = 1;
    if (last && last.invoiceNo) {
      const parts = last.invoiceNo.split("-");
      nextNo = parseInt(parts[2]) + 1;
    }

    const invoiceNo = `INV-${year}-${String(nextNo).padStart(4, "0")}`;
    const date = new Date().toISOString().split("T")[0];

    const invoice = await Revenue.create({
      invoiceNo,
      patientName,
      status: status || "Paid",
      opId,
      token,
      doctor,
      visitTime,
      amount,
      date,
      source: "OP", // 🔥 OP invoices tagged
    });

    res.json(invoice);
  } catch (err) {
    console.error("OP invoice error:", err);
    res.status(500).json({ message: "Failed to create OP invoice" });
  }
});

// ===============================
// OP REVENUE STATS (Dashboard)
// GET /api/op-revenue/stats
// ===============================
router.get("/stats", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const totalRevenue = await Revenue.sum("amount", {
      where: {
        status: "Paid",
        source: "OP",
      },
    });

    const todayRevenue = await Revenue.sum("amount", {
      where: {
        status: "Paid",
        source: "OP",
        date: today,
      },
    });

    res.json({
      totalRevenue: totalRevenue || 0,
      todayRevenue: todayRevenue || 0,
    });
  } catch (err) {
    console.error("OP revenue stats error:", err);
    res.status(500).json({ message: "Failed to fetch OP revenue stats" });
  }
});

module.exports = router;
