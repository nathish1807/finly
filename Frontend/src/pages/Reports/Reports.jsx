import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import PageContainer from "../../components/PageContainer/PageContainer";
import Card from "../../components/Card/Card";

import ExpenseChart from "../../components/Charts/ExpenseChart";
import IncomeExpenseChart from "../../components/Charts/IncomeExpenseChart";

import { getTransactions } from "../../services/transactionService";
import { downloadReport } from "../../services/reportService";

export default function Reports() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const expenseData = transactions
    .filter((tx) => tx.type === "Expense")
    .map((tx) => ({
      category: tx.category,
      amount: tx.amount,
    }));

  const totalIncome = transactions
    .filter((tx) => tx.type === "Income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "Expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <MainLayout>
      <PageContainer>

        {/* Heading */}

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Reports
          </h1>

          <p className="text-gray-500 mt-2">
            Analyze your income, expenses, and financial summary.
          </p>
        </div>

        {/* Download PDF */}

        <button
          onClick={() => downloadReport(transactions)}
          className="mb-8 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition"
        >
          Download PDF Report
        </button>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <Card className="p-6">

            <h2 className="text-gray-500 text-sm">
              Total Income
            </h2>

            <p className="text-3xl font-bold text-green-600 mt-3">
              ₹{totalIncome}
            </p>

          </Card>

          <Card className="p-6">

            <h2 className="text-gray-500 text-sm">
              Total Expense
            </h2>

            <p className="text-3xl font-bold text-red-600 mt-3">
              ₹{totalExpense}
            </p>

          </Card>

          <Card className="p-6">

            <h2 className="text-gray-500 text-sm">
              Balance
            </h2>

            <p className="text-3xl font-bold text-blue-600 mt-3">
              ₹{balance}
            </p>

          </Card>

        </div>

        {/* Income vs Expense */}

        <Card className="mb-8 p-6 overflow-x-auto">

          <h2 className="text-2xl font-bold mb-5">
            Income vs Expense
          </h2>

          <div className="h-80">
            <IncomeExpenseChart
              income={totalIncome}
              expense={totalExpense}
            />
          </div>

        </Card>

        {/* Expense Chart */}

        <Card className="p-6 overflow-x-auto">

          <h2 className="text-2xl font-bold mb-5">
            Expense Breakdown
          </h2>

          <div className="h-80">
            <ExpenseChart data={expenseData} />
          </div>

        </Card>

      </PageContainer>
    </MainLayout>
  );
}