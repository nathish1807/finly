const express = require("express");

const router = express.Router();

const {
  sendOTP,
  verifyOTP,
  resetPassword,
} = require("../controllers/otpController");

router.post("/send", sendOTP);

router.post("/verify", verifyOTP);

router.post("/reset", resetPassword);

module.exports = router;