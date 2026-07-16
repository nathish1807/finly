const User = require("../models/User");
const Account = require("../models/Account");
const OTP = require("../models/OTP");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const transporter = require("../config/mail");
// =======================
// Register User
// =======================
exports.register = async (req, res) => {
  try {
    console.log(req.body);
const { name, email, password, bankName } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    await Account.create({
  user: user._id,
  accountName: bankName,
  accountType: "Bank",
  balance: 0,
});

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });

  }
};

// =======================
// Login User
// =======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
console.log("Login User ID:", user._id);
    // Create JWT Token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  console.log("Forgot Password API Hit");
  try {
    console.log("Forgot Password API Called");
    console.log(req.body);

    const { email } = req.body;

    const user = await User.findOne({ email });

    console.log("User:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Generated OTP:", otp);

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp,
    });

    console.log("OTP Saved");

   try {
  const info = await Promise.race([
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Finly Password Reset OTP",
      text: `Your OTP is ${otp}`,
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Mail Timeout")), 10000)
    ),
  ]);

  console.log("Mail Sent:", info.messageId);

} catch (err) {
  console.log("MAIL ERROR:", err);

  return res.status(500).json({
    success: false,
    message: err.message,
  });
}
    console.log("Mail Sent");

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.resetPassword = async (req, res) => {
  try {

    const { email, otp, password } = req.body;

    // Check OTP
    const otpData = await OTP.findOne({
      email,
      otp,
    });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    // Delete OTP
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