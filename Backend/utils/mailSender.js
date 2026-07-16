const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "Finly Password Reset OTP",

    html: `
      <div style="font-family:Arial;padding:20px">
        <h2>Finly</h2>

        <p>Your OTP for password reset is</p>

        <h1>${otp}</h1>

        <p>This OTP is valid for only 5 minutes.</p>

        <p>Please do not share this OTP with anyone.</p>

        <br/>

        <b>Finly Team</b>
      </div>
    `,
  });
};

module.exports = sendOTPEmail;