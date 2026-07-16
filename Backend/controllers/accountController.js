const Account = require("../models/Account");

// Create Account
exports.createAccount = async (req, res) => {
  try {
    const { accountName, accountType, balance } = req.body;

    const account = await Account.create({
      user: req.user.id,
      accountName,
      accountType,
      balance,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      account,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Accounts
// Get All Accounts
exports.getAccounts = async (req, res) => {
  try {
    console.log("Logged In User ID:", req.user.id);

    const accounts = await Account.find({
      user: req.user.id,
    });

    console.log("Accounts Found:", accounts);

    res.status(200).json({
      success: true,
      accounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Account
exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Account updated successfully",
      account,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Account
exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

