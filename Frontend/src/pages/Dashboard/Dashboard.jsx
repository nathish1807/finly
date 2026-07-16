import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiCreditCard,
} from "react-icons/fi";

import MainLayout from "../../layouts/MainLayout.jsx";
import PageContainer from "../../components/PageContainer/PageContainer.jsx";
import Card from "../../components/Card/Card.jsx";
import useAutoLogout from "../../hooks/useAutoLogout.js";
import { getDashboard } from "../../services/authService.js";
import ExpenseChart from "../../components/Charts/ExpenseChart.jsx";

export default function Dashboard() {
  useAutoLogout();
  const [dashboard, setDashboard] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    recentTransactions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();

      console.log("Dashboard Response:", data);

      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Expense Chart Data
  const chartData = dashboard.recentTransactions
    .filter((tx) => tx.type === "Expense")
    .map((tx) => ({
      category: tx.category,
      amount: tx.amount,
    }));

  const SUMMARY_CARDS = [
    {
      label: "Total Balance",
      value: `₹${dashboard.balance}`,
      icon: FiCreditCard,
    },
    {
      label: "Total Income",
      value: `₹${dashboard.totalIncome}`,
      icon: FiArrowUpRight,
    },
    {
      label: "Total Expense",
      value: `₹${dashboard.totalExpense}`,
      icon: FiArrowDownRight,
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <PageContainer>
<h2 className="text-center text-xl font-semibold">            Loading Dashboard...
          </h2>
        </PageContainer>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
<PageContainer className="flex flex-col gap-8 px-2 sm:px-4">
        {/* Heading */}

        <div className="mb-2">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Welcome 👋
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Here is your personal finance summary.
          </p>
        </div>

        {/* Summary Cards */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUMMARY_CARDS.map((card) => (
            <Card
  key={card.label}
  className="rounded-2xl shadow-md hover:shadow-lg transition p-5"
>

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    {card.label}
                  </p>

<h2 className="text-2xl sm:text-3xl font-bold mt-3">                    {card.value}
                  </h2>

                </div>

                <div className="bg-blue-100 p-4 rounded-full">
                  <card.icon
                    size={24}
                    className="text-blue-600"
                  />
                </div>

              </div>

            </Card>
          ))}

        </div>

        {/* Expense Pie Chart */}

        <Card className="rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-5">
            Expense Breakdown
          </h2>

          {chartData.length === 0 ? (
            <p className="text-gray-500">
              No Expense Data Available
            </p>
          ) : (
            <div className="h-72 sm:h-80">
  <ExpenseChart data={chartData} />
</div>
          )}

        </Card>

        {/* Recent Transactions */}

        <Card className="rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-5">
            Recent Transactions
          </h2>

          {dashboard.recentTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No Transactions Found
            </div>
          ) : (
            <ul className="divide-y">

              {dashboard.recentTransactions.map((tx) => (
                <li
  key={tx._id}
  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-4"
>

                  <div>

                    <h3 className="font-semibold text-lg">
                      {tx.category}
                    </h3>

                    <p className="text-gray-500">
                      {tx.type}
                    </p>

                    <p className="text-sm text-gray-400">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>

                  </div>

                  <div
  className={`text-xl font-bold ${
    tx.type === "Income"
      ? "text-green-600"
      : "text-red-500"
  }`}
>
                    {tx.type === "Income" ? "+" : "-"}₹{tx.amount}
                  </div>

                </li>
              ))}

            </ul>
          )}

        </Card>

      </PageContainer>
    </MainLayout>
  );
}