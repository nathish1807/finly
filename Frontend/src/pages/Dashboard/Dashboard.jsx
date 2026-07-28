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
import { getTransactions } from "../../services/transactionService";

import ExpenseChart from "../../components/Charts/ExpenseChart.jsx";
import CountUp from "react-countup";
export default function Dashboard() {
  useAutoLogout();
  const [dashboard, setDashboard] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    recentTransactions: [],
  });
  const [expenseData, setExpenseData] = useState([]);

  const [loading, setLoading] = useState(true);
const user = JSON.parse(localStorage.getItem("user"));

const currentHour = new Date().getHours();

const greeting =
  currentHour < 12
    ? "Good Morning"
    : currentHour < 17
    ? "Good Afternoon"
    : "Good Evening";
  useEffect(() => {
    fetchDashboard();
    fetchTransactions();
}, []);

 const fetchTransactions = async () => {
  try {
    const data = await getTransactions();

    const expenses = data.transactions
      .filter((tx) => tx.type === "Expense")
      .map((tx) => ({
        category: tx.category,
        amount: Number(tx.amount),
      }));

    setExpenseData(expenses);

  } catch (error) {
    console.log(error);
  }
};
const fetchDashboard = async () => {
  try {
    setLoading(true);

    const data = await getDashboard();

    setDashboard(data);

  } catch (error) {
    console.log(error);
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
const highestExpense = dashboard.recentTransactions
  .filter((tx) => tx.type === "Expense")
  .sort((a, b) => b.amount - a.amount)[0];

const highestIncome = dashboard.recentTransactions
  .filter((tx) => tx.type === "Income")
  .sort((a, b) => b.amount - a.amount)[0];

const savings = dashboard.totalIncome - dashboard.totalExpense;
const expensePercentage =
  dashboard.totalIncome > 0
    ? (
        (dashboard.totalExpense /
          dashboard.totalIncome) *
        100
      ).toFixed(1)
    : 0;

const incomeExpenseRatio =
  dashboard.totalExpense > 0
    ? (
        dashboard.totalIncome /
        dashboard.totalExpense
      ).toFixed(1)
    : 0;

const highestCategory =
  expenseData.length > 0
    ? expenseData.reduce((a, b) =>
        a.amount > b.amount ? a : b
      )
    : null;

const savingsRate =
  dashboard.totalIncome > 0
    ? (
        (savings /
          dashboard.totalIncome) *
        100
      ).toFixed(1)
    : 0;
 const SUMMARY_CARDS = [
  {
    label: "Total Balance",
    value: dashboard.balance,
    icon: FiCreditCard,
    color: "from-[#2B2B2B] to-[#161616]",
    iconBg: "bg-[#8B5E3C]/20",
    iconColor: "text-[#D4AF37]",
    glow: "hover:shadow-[0_0_60px_rgba(212,175,55,0.55)]",
    borderHover: "hover:border-[#D4AF37]/70",
  },
  {
    label: "Income",
    value: dashboard.totalIncome,
    icon: FiArrowUpRight,
    color: "from-[#1A2E1A] to-[#234D20]",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-300",
    glow: "hover:shadow-[0_0_60px_rgba(34,197,94,0.55)]",
    borderHover: "hover:border-green-400/70",
  },
  {
    label: "Expense",
    value: dashboard.totalExpense,
    icon: FiArrowDownRight,
    color: "from-[#3B1E1E] to-[#5B2B2B]",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-300",
    glow: "hover:shadow-[0_0_60px_rgba(239,68,68,0.55)]",
    borderHover: "hover:border-red-400/70",
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
<PageContainer className="flex flex-col gap-12 px-2 sm:px-4">
        {/* Heading */}

<div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-[#1A120B] via-[#3B2A20] to-[#8B5E3C] p-8 text-white shadow-2xl">
  <div className="absolute top-0 right-0 h-52 w-52 rounded-full bg-white/10 blur-3xl"></div>

  <div className="relative z-10">

    {/* <p className="text-sm uppercase tracking-widest text-blue-100">
      Personal Finance Dashboard
    </p> */}

    <div className="mt-3">

  <p className="text-lg text-[#E6C78B] font-bold">
    {greeting} 👋
  </p>

  <h1 className="mt-2 text-5xl font-bold">
    {user?.name}
  </h1>

  <p className="mt-4 max-w-xl text-[#F5E7C5] text-lg">
    Welcome back!
  </p>

</div>

    {/* <div className="mt-8 flex items-center gap-6">

      <div>
        <p className="text-sm text-blue-100">
          Current Balance
        </p>

       <h2 className="mt-2 text-5xl font-extrabold text-[#F8E7B0] drop-shadow-lg">
  ₹
  <CountUp
    end={dashboard.balance}
    duration={2}
    separator=","
  />
</h2>
      </div>

    </div> */}

  </div>

</div>

        {/* Summary Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9">
  {SUMMARY_CARDS.map((card) => (
   <div
  key={card.label}
 className={`
  relative
  overflow-hidden
  rounded-[28px]
  bg-gradient-to-br
  ${card.color}
  p-7
  shadow-2xl
  border
  border-white/10
  transition-all
  duration-500
  hover:-translate-y-3
  hover:scale-[1.03]
  ${card.glow}
  ${card.borderHover}
`}
>
      <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-white/10 blur-2xl"></div>

<div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/20 to-transparent"></div>

      <div className="relative flex items-start justify-between">

        <div>

          <p className="uppercase tracking-widest text-xs text-white/70">
            {card.label}
          </p>

          <h2 className="mt-4 text-5xl font-extrabold text-white">
            ₹
<CountUp
  end={card.value}
  duration={2}
  separator=","
/>
          </h2>

          <div
  className={`mt-6 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-md ${
    card.change >= 0
      ? "bg-green-500/15 text-green-300"
      : "bg-red-500/15 text-red-300"
  }`}
>
  {card.change >= 0 ? "▲" : "▼"}{" "}
  {Math.abs(Number(card.change || 0)).toFixed(1)}% This Month
</div>

        </div>

        <div
  className={`
    ${card.iconBg}
    rounded-3xl
    p-5
    shadow-xl
    border
    border-white/10
    backdrop-blur-xl
    transition-all
    duration-300
    hover:rotate-6
  `}
>
          <card.icon
  size={34}
  className={card.iconColor}
/>
        </div>

      </div>
    </div>
  ))}
</div>
<Card className="mt-8 rounded-3xl border border-[#2B2B2B] bg-[#181818] p-8 shadow-xl">

  <h2 className="text-3xl font-bold text-white mb-6">
    💡 Financial Insights
  </h2>

  <div className="space-y-4 text-lg">

    <div className="flex items-center gap-3">
      <span className="text-green-400">✓</span>
      <span className="text-gray-300">
        Income exceeds expenses by
        <span className="ml-2 font-bold text-[#D4AF37]">
          ₹{savings.toLocaleString()}
        </span>
      </span>
    </div>

    {highestExpense && (
      <div className="flex items-center gap-3">
        <span className="text-red-400">✓</span>
        <span className="text-gray-300">
          Highest Expense:
          <span className="ml-2 font-bold text-white">
            {highestExpense.category}
          </span>
          <span className="ml-2 text-red-400">
            ₹{highestExpense.amount.toLocaleString()}
          </span>
        </span>
      </div>
    )}

    {highestIncome && (
      <div className="flex items-center gap-3">
        <span className="text-green-400">✓</span>
        <span className="text-gray-300">
          Largest Income:
          <span className="ml-2 font-bold text-white">
            {highestIncome.category}
          </span>
          <span className="ml-2 text-green-400">
            ₹{highestIncome.amount.toLocaleString()}
          </span>
        </span>
      </div>
    )}

    <div className="flex items-center gap-3">
      <span className="text-blue-400">✓</span>
      <span className="text-gray-300">
        Total Transactions:
        <span className="ml-2 font-bold text-white">
          {dashboard.recentTransactions.length}
        </span>
      </span>
    </div>

  </div>

</Card>
<Card className="mt-8 rounded-3xl border border-[#D4AF37]/20 bg-[#181818] p-8 shadow-xl">

<h2 className="text-3xl font-bold text-white mb-8">
💡 Smart Spending Recommendations
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

<Card className="p-5">

<p className="text-gray-400">
Highest Spending Category
</p>

<h3 className="mt-3 text-2xl font-bold text-red-400">

{
highestCategory
?
highestCategory.category
:
"-"
}

</h3>

<p className="mt-3 text-gray-500">

₹{
highestCategory
?
highestCategory.amount.toLocaleString()
:0
}

</p>

</Card>

<Card className="p-5">

<p className="text-gray-400">
Income / Expense Ratio
</p>

<h3 className="mt-3 text-2xl font-bold text-green-400">

{incomeExpenseRatio}x

</h3>

<p className="mt-3 text-gray-500">

Healthy ratio above 2x

</p>

</Card>

<Card className="p-5">

<p className="text-gray-400">
Savings Rate
</p>

<h3 className="mt-3 text-2xl font-bold text-[#FFD700]">

{savingsRate}%

</h3>

<p className="mt-3 text-gray-500">

Excellent above 30%

</p>

</Card>

<Card className="p-5">

<p className="text-gray-400">
Expense Percentage
</p>

<h3 className="mt-3 text-2xl font-bold text-orange-400">

{expensePercentage}%

</h3>

<p className="mt-3 text-gray-500">

Lower is better

</p>

</Card>

</div>

<div className="mt-8 rounded-2xl border border-[#D4AF37]/20 bg-[#202020] p-6">

<p className="text-lg text-white leading-8">

💡 You spent

<span className="font-bold text-red-400">

{" "}
{expensePercentage}%{" "}

</span>

of your income.

Your highest expense is

<span className="font-bold text-[#FFD700]">

{" "}
{
highestCategory
?
highestCategory.category
:
"-"
}

</span>.

You can currently save

<span className="font-bold text-green-400">

{" "}
₹{savings.toLocaleString() }

</span>

 this month.

</p>

</div>

</Card>

        {/* Expense Pie Chart */}

        <Card className="mt-8 rounded-3xl border border-[#2B2B2B] bg-[#181818] p-8 shadow-xl">

          <h2 className="mb-0 text-3xl font-bold text-white">
            Expense Breakdown
          </h2>

          {chartData.length === 0 ? (
            <p className="text-gray-500">
              No Expense Data Available
            </p>
          ) : (
          <div className="h-[420px] overflow-visible">
  <ExpenseChart data={expenseData} />
</div>
          )}

        </Card>

        {/* Recent Transactions */}

       <Card className="mt-8 rounded-[30px] border border-[#2B2B2B] bg-[#181818] p-10 shadow-2xl">

          <div className="flex items-center justify-between mb-8">

    <div>

        <h2 className="text-4xl font-bold text-white">
            Recent Transactions
        </h2>

        <p className="text-gray-400 mt-1">
            Your latest financial activity
        </p>

    </div>

    <button
        className="
        rounded-xl
        border
        border-[#2E2E2E]
        px-5
        py-2.5
        text-[#D4AF37]
        transition
        hover:border-[#D4AF37]
        hover:bg-[#D4AF37]/10
    "
    >
        View All →
    </button>

</div>

          {dashboard.recentTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No Transactions Found
            </div>
          ) : (
            <ul>

              {dashboard.recentTransactions.map((tx) => (
               <li
  key={tx._id}
  className="
    group
    relative
    mb-5
    overflow-hidden
    rounded-3xl
    border
    border-[#2E2E2E]
    bg-gradient-to-r
    from-[#202020]
    to-[#1A1A1A]
    p-5
    transition-all
    duration-500
    hover:-translate-y-1
    hover:scale-[1.01]
    hover:border-[#D4AF37]
    hover:shadow-[0_0_40px_rgba(212,175,55,.18)]
  "
>

  {/* Gold Glow */}
  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#D4AF37]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100"></div>

  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

    {/* LEFT */}
    <div className="flex items-center gap-4">

      <div
        className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 ${
          tx.type === "Income"
            ? "bg-green-500/20"
            : "bg-red-500/20"
        }`}
      >
        <span className="text-2xl sm:text-3xl">
          {tx.type === "Income" ? "💰" : "💳"}
        </span>
      </div>

      <div>

        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {tx.category}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2">

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              tx.type === "Income"
                ? "bg-green-500/20 text-green-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {tx.type}
          </span>

          <span className="text-xs sm:text-sm text-gray-500">
            {new Date(tx.date).toLocaleDateString()}
          </span>

        </div>

      </div>

    </div>

    {/* RIGHT */}
    <div className="text-left sm:text-right">

      <h2
        className={`text-2xl sm:text-3xl font-extrabold ${
          tx.type === "Income"
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {tx.type === "Income" ? "+" : "-"}₹
        {tx.amount.toLocaleString()}
      </h2>

      <p className="mt-1 text-xs sm:text-sm text-gray-500">
        {tx.type === "Income"
          ? "Income Received"
          : "Money Spent"}
      </p>

    </div>

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