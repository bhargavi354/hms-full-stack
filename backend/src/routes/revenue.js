const express = require("express");
const router = express.Router();
const { Revenue } = require("../models");

// ======================
// TEST
// ======================
router.get("/test", (req, res) => {
  res.send("Revenue route working ✅");
});

// ======================
// ✅ GET ALL REVENUE (ADMIN + OP)
// Used by ADMIN DASHBOARD
// ======================
router.get("/", async (req, res) => {
  try {
    const data = await Revenue.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ======================
// ✅ GET ONLY ADMIN REVENUE (NO OP PATIENTS)
// Used by Admin Revenue PAGE
// ======================
router.get("/admin", async (req, res) => {
  try {
    const data = await Revenue.findAll({
      where: { source: "ADMIN" },
      order: [["createdAt", "DESC"]],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// ✅ VIEW BILL BY OP ID (FIXES YOUR ISSUE)
// Used by: /revenue/view?opId=1
// ======================
router.get("/by-op/:opId", async (req, res) => {
  try {
    const { opId } = req.params;

    const bill = await Revenue.findOne({
      where: { opId },
      order: [["createdAt", "DESC"]],
    });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ======================
// ✅ REFUND INVOICE BY OP ID
// ======================
router.post("/refund/:opId", async (req, res) => {
  try {
    const { opId } = req.params;

    const invoice = await Revenue.findOne({
      where: { opId },
      order: [["createdAt", "DESC"]],
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (invoice.status === "Refunded") {
      return res.status(400).json({ message: "Already refunded" });
    }

    invoice.status = "Refunded";
    await invoice.save();

    res.json({ message: "Refund successful" });
  } catch (err) {
    res.status(500).json({ message: "Refund failed" });
  }
});

// ======================
// CREATE ADMIN INVOICE (MANUAL)
// ======================
router.post("/", async (req, res) => {
  try {
    const {
      invoiceNo,
      patientName,
      date,
      finalAmount,
      totalAmount,
      status,
    } = req.body;

    if (!invoiceNo || !patientName) {
      return res
        .status(400)
        .json({ message: "Invoice no & patient name required" });
    }

    const saved = await Revenue.create({
      invoiceNo,
      patientName,
      date,
      amount: finalAmount ?? totalAmount ?? 0,
      status: status || "pending",
      source: "ADMIN",
    });

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create invoice" });
  }
});

// ======================
// UPDATE STATUS
// ======================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const invoice = await Revenue.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    invoice.status = status || invoice.status;
    await invoice.save();

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: "Failed to update invoice" });
  }
});

// ======================
// DELETE INVOICE
// ======================
router.delete("/:id", async (req, res) => {
  try {
    const invoice = await Revenue.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    await invoice.destroy();
    res.json({ message: "Invoice deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete invoice" });
  }
});

module.exports = router;
