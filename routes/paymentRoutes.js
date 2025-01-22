const express = require("express");
const router = express.Router();
const { initiatePayment, verifyPayment } = require("../controllers/paymentControllers");

router.post("/payments", initiatePayment);
router.get("/payments/:reference", verifyPayment);

module.exports = router;
