const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);

console.log("Logged In User:", decoded);

req.user = decoded;

next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};