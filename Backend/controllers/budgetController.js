const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");

// Create Budget
exports.createBudget = async (req, res) => {
  try {
    const { category, limit } = req.body;

    const budget = await Budget.create({
      user: req.user.id,
      category,
      limit,
    });

    res.status(201).json({
      success: true,
      message: "Budget created successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Budgets

// Get All Budgets with Spending
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user.id,
    });

    const budgetData = await Promise.all(
      budgets.map(async (budget) => {
        const expenses = await Transaction.find({
          user: req.user.id,
          type: "Expense",
          category: budget.category,
        });

        const spent = expenses.reduce(
          (total, item) => total + item.amount,
          0
        );

        return {
          ...budget.toObject(),
          spent,
          remaining: budget.limit - spent,
          percentage:
            budget.limit > 0
              ? Math.min((spent / budget.limit) * 100, 100)
              : 0,
        };
      })
    );

    res.status(200).json({
      success: true,
      budgets: budgetData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Budget
exports.updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Budget
exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};