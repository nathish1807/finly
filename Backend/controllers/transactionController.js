const Transaction = require("../models/Transaction");
const Account = require("../models/Account");

// ===============================
// Add Transaction
// ===============================
exports.addTransaction = async (req, res) => {
  try {
    const { account, type, category, amount, description } = req.body;

    const accountData = await Account.findById(account);

    if (!accountData) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    // Update Account Balance
    if (type === "Income") {
      accountData.balance += Number(amount);
    } else if (type === "Expense") {
      accountData.balance -= Number(amount);
    }

    await accountData.save();

    const transaction = await Transaction.create({
      user: req.user.id,
      account,
      type,
      category,
      amount,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Transaction Added Successfully",
      transaction,
      currentBalance: accountData.balance,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Transactions
// ===============================
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    }).populate("account");

    res.status(200).json({
      success: true,
      transactions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Transaction
// Update Transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    const account = await Account.findById(transaction.account);

    // Reverse old transaction effect
    if (transaction.type === "Income") {
      account.balance -= transaction.amount;
    } else {
      account.balance += transaction.amount;
    }

    // Update transaction
    transaction.type = req.body.type;
    transaction.category = req.body.category;
    transaction.amount = req.body.amount;
    transaction.description = req.body.description;

    // Apply new transaction effect
    if (transaction.type === "Income") {
      account.balance += Number(transaction.amount);
    } else {
      account.balance -= Number(transaction.amount);
    }

    await account.save();
    await transaction.save();

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction,
      currentBalance: account.balance,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Transaction
// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Find Account
    const account = await Account.findById(transaction.account);

    if (account) {
      if (transaction.type === "Income") {
        account.balance -= transaction.amount;
      } else {
        account.balance += transaction.amount;
      }

      await account.save();
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      currentBalance: account ? account.balance : null,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};