const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");

router.post("/", authMiddleware, createAccount);
router.get("/", authMiddleware, getAccounts);
router.put("/:id", authMiddleware, updateAccount);
router.delete("/:id", authMiddleware, deleteAccount);

module.exports = router;