import express from "express";
import crypto from "crypto";

const router = express.Router();

// Test credentials (sandbox)
const PAYU_KEY = "WRZJ1f";
const PAYU_SALT = "fAmZbjEc0cbVRMhVzQBkgf26HiE7HBwQ";

// 🚀 1. INITIATE PAYMENT
router.post("/payu/initiate", (req, res) => {
  try {
    const { amount, email, name, phone } = req.body;

    // ✅ Ensure safe values
    const safeAmount = parseFloat(amount).toFixed(2);
    const safeName = name || "Guest User";
    const safeEmail = email || "guest@example.com";
    const safePhone = phone || "9999999999";

    const txnid = "txn_" + Date.now();
    const productinfo = "ShopEasy Order";

    // ✅ Correct PayU hash format
    const hashString = `${PAYU_KEY}|${txnid}|${safeAmount}|${productinfo}|${safeName}|${safeEmail}|||||||||||${PAYU_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    // ✅ Send all required fields back
    res.json({
      key: PAYU_KEY,
      txnid,
      amount: safeAmount,
      productinfo,
      firstname: safeName,
      email: safeEmail,
      phone: safePhone,
      surl: "http://localhost:8000/api/v1/payu/response", // correct backend route
      furl: "http://localhost:8000/api/v1/payu/response", // correct backend route
      hash,
      service_provider: "payu_paisa",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🚀 2. HANDLE RESPONSE (PayU → backend)
router.post("/payu/response", (req, res) => {
  try {
    console.log("=== PayU Response ===");
    console.log(req.body);  // <--- logs entire payload PayU sent
    console.log("====================");
    const {
      key, txnid, amount, productinfo,
      firstname, email, hash
    } = req.body;

    // ✅ Recalculate hash for verification
    const hashString = `${PAYU_SALT}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_KEY}`;
    const expectedHash = crypto.createHash("sha512").update(hashString).digest("hex");

    if (expectedHash !== hash) {
      return res.status(400).send("Hash mismatch");
    }

    // ✅ Redirect to frontend
    if (status === "success") {
      return res.redirect("http://localhost:5173/paymentSuccess");
    } else {
      return res.redirect("http://localhost:5173/paymentFailure");
    }
  } catch (error) {
    res.status(500).send("Error processing PayU response");
  }
});

export default router;
