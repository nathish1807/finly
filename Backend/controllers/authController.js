const User = require("../models/User");
const Account = require("../models/Account");
const OTP = require("../models/OTP");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const resend = require("../config/mail");
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
  try {
    const { email } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Save OTP
    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp,
    });

    // Send email using Brevo API
    // Send email using Resend
const { data, error } = await resend.emails.send({
  from: "Finly Team <noreply@finly.bond>",
  to: email,
  subject: "Finly | Password Reset Verification Code",
  html: `
    <h2>Finly Password Reset</h2>

    <p>Hello <strong>${user.name}</strong>,</p>

    <p>We received a request to reset the password for your <strong>Finly</strong> account.</p>

    <p>Your verification code is:</p>

    <h1 style="letter-spacing:5px; color:#2563eb;">${otp}</h1>

    <p><strong>This OTP is valid for 10 minutes.</strong></p>

    <br>

    <p>Regards,</p>
    <p><strong>Finly Team</strong></p>
  `,
});

if (error) {
  console.log(error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}

console.log("Resend Response:", data);

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
