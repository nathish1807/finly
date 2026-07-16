const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log("MAIL ERROR:", err);
  } else {
    console.log("MAIL SERVER READY");
  }
});

module.exports = transporter;
