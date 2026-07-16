const OTP = require("../models/OTP");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");

const sendOTPEmail = require("../utils/mailSender");


// ========================
// Send OTP
// ========================

exports.sendOTP = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp,
    });

    await sendOTPEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// ========================
// Verify OTP
// ========================

exports.verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const data = await OTP.findOne({ email });

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    if (data.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP Verified",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// ========================
// Reset Password
// ========================

exports.resetPassword = async (req, res) => {

  try {

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    await OTP.deleteMany({ email });

    res.status(200).json({
      success: true,
      message: "Password Updated Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};