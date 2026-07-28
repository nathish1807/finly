const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multer");
const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePhoto,
} = require("../controllers/profileController");

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);

router.put("/password", authMiddleware, changePassword);
router.post(
  "/upload-photo",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfilePhoto
);
module.exports = router;