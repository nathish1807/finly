import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import PageContainer from "../../components/PageContainer/PageContainer";
import Card from "../../components/Card/Card";

import ExpenseChart from "../../components/Charts/ExpenseChart";
import IncomeExpenseChart from "../../components/Charts/IncomeExpenseChart";

import { getTransactions } from "../../services/transactionService";
import { downloadReport } from "../../services/reportService";
import MonthlyTrendChart from "../../components/Charts/MonthlyTrendChart";
import { downloadExcel } from "../../services/excelService";
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
    amount: Number(tx.amount),
  }));

  const totalIncome = transactions
    .filter((tx) => tx.type === "Income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "Expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;
  const savingsRate =
  totalIncome > 0
    ? ((balance / totalIncome) * 100).toFixed(1)
    : 0;

const highestExpense =
  expenseData.length > 0
    ? expenseData.reduce((a, b) =>
        a.amount > b.amount ? a : b
      )
    : null;

const averageExpense =
  expenseData.length > 0
    ? (
        totalExpense / expenseData.length
      ).toFixed(0)
    : 0;

const financialHealth =
  savingsRate >= 50
    ? "Excellent"
    : savingsRate >= 30
    ? "Good"
    : savingsRate >= 10
    ? "Average"
    : "Needs Improvement";

const monthlyData = [];

for (let i = 0; i < 12; i++) {
  const month = new Date(2026, i).toLocaleString("default", {
    month: "short",
  });

  const income = transactions
    .filter(
      (tx) =>
        tx.type === "Income" &&
        new Date(tx.date).getMonth() === i
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expense = transactions
    .filter(
      (tx) =>
        tx.type === "Expense" &&
        new Date(tx.date).getMonth() === i
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  monthlyData.push({
    month,
    Income: income,
    Expense: expense,
  });
}
  return (
    <MainLayout>
      <PageContainer>

        {/* Heading */}

        {/* Premium Hero */}

<div className="relative mb-8 overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-gradient-to-r from-[#181818] via-[#111111] to-[#181818] p-5 sm:p-6 lg:p-8">

  <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#FFD700]/10 blur-[120px]" />
  <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#8B5E3C]/10 blur-[120px]" />

<div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

  <div>

    <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
      Financial Reports
    </h1>

    <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-400 max-w-xl">
      Analyze your financial health with beautiful insights.
    </p>

  </div>

  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:justify-end">

    <button

     
     onClick={() => {

  console.log(transactions);
  downloadReport(transactions);
}}
      className="
      w-full
sm:w-auto
min-w-[180px]
      rounded-2xl
      bg-gradient-to-r
      from-[#8B5E3C]
      via-[#D4AF37]
      to-[#FFD700]
      px-7
      py-4
      font-bold
      text-black
      transition-all
      duration-300
      hover:scale-105
      shadow-[0_0_30px_rgba(212,175,55,.25)]
      "
    >
      Export PDF
    </button>

    <button
      onClick={() => downloadExcel(transactions)}
      className="
      flex-1
      lg:flex-none
      rounded-2xl
      bg-gradient-to-r
      from-[#1B5E20]
      via-[#2E8B57]
      to-[#49B675]
      px-7
      py-4
      font-bold
      text-white
      transition-all
      duration-300
      hover:scale-105
      shadow-[0_0_30px_rgba(46,139,87,.25)]
      "
    >
      Export Excel
    </button>

  </div>
  </div>
  </div>

        

       {/* Premium Summary */}

<div className="grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 gap-6 mb-10">

<Card className="relative overflow-hidden p-7 border border-green-500/20">

<div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-500/10 blur-[80px]" />

<p className="text-sm uppercase tracking-[3px] text-gray-400">
Income
</p>

<h2 className="mt-5 text-3xl sm:text-4xl font-bold text-green-400">
₹{totalIncome.toLocaleString()}
</h2>

<p className="mt-4 text-green-300">
▲ Positive Cash Flow
</p>

</Card>

<Card className="relative overflow-hidden p-7 border border-red-500/20">

<div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-red-500/10 blur-[80px]" />

<p className="text-sm uppercase tracking-[3px] text-gray-400">
Expense
</p>

<h2 className="mt-5 text-3xl sm:text-4xl font-bold text-red-400">
₹{totalExpense.toLocaleString()}
</h2>

<p className="mt-4 text-red-300">
▼ Spending
</p>

</Card>

<Card className="relative overflow-hidden p-7 border border-[#D4AF37]/20">

<div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#FFD700]/10 blur-[80px]" />

<p className="text-sm uppercase tracking-[3px] text-gray-400">
Balance
</p>

<h2 className="mt-5 text-3xl sm:text-4xl font-bold text-[#FFD700]">
₹{balance.toLocaleString()}
</h2>

<p className="mt-4 text-[#FFD700]">
💰 Available Balance
</p>

</Card>

</div>

        {/* Income vs Expense */}

        <Card className="mb-10 overflow-hidden rounded-[30px] border border-[#D4AF37]/20 bg-[#171717] p-8 shadow-[0_0_40px_rgba(212,175,55,.08)]">

         <div className="mb-8 flex items-center justify-between">

<div>

<h2 className="text-3xl font-bold text-white">
Income vs Expense
</h2>

<p className="mt-2 text-gray-400">
Compare your earnings and spending.
</p>

</div>

<div className="rounded-xl border border-[#D4AF37]/20 bg-[#202020] px-4 py-2 text-[#FFD700]">

₹{balance.toLocaleString()}

</div>

</div>

          <div className="h-[320px] sm:h-[520px] lg:h-[400px]">
            <IncomeExpenseChart
              income={totalIncome}
              expense={totalExpense}
            />
          </div>

        </Card>

        {/* Expense Chart */}
<Card className="overflow-hidden rounded-[30px] border border-[#D4AF37]/20 bg-[#171717] p-8 shadow-[0_0_40px_rgba(212,175,55,.08)]">

          <div className="mb-8">

<h2 className="text-3xl font-bold text-white">
Expense Breakdown
</h2>

<p className="mt-2 text-gray-400">
See where your money goes every month.
</p>

</div>

          <div className="grid grid-cols-1 xl:grid-cols-[65%_35%] gap-6">
<div className="h-[350px] sm:h-[380px] lg:h-[420px]">

<ExpenseChart data={expenseData} />

</div>

<div className="space-y-4">

<Card className="p-5">

<h3 className="text-lg font-bold text-[#FFD700]">
Top Expense
</h3>

<p className="mt-0 text-xl sm:text-2xl font-bold">

{
expenseData.length
?expenseData.reduce((a,b)=>a.amount>b.amount?a:b).category
:"-"
}

</p>

</Card>

<Card className="p-5">

<h3 className="text-lg font-bold text-[#FFD700]">
Largest Amount
</h3>

<p className="mt-4 text-xl sm:text-2xl font-bold">

₹{
expenseData.length
?expenseData.reduce((a,b)=>a.amount>b.amount?a:b).amount.toLocaleString()
:0
}

</p>

</Card>

<Card className="p-5">

<h3 className="text-lg font-bold text-[#FFD700]">
Total Categories
</h3>

<p className="mt-4 text-xl sm:text-2xl font-bold">

{expenseData.length}

</p>

</Card>

</div>

</div>

                </Card>

        {/* Monthly Trend */}

        <Card className="mt-10 overflow-hidden rounded-[30px] border border-[#D4AF37]/20 bg-[#171717] p-5 sm:p-6 lg:p-8 shadow-[0_0_40px_rgba(212,175,55,.08)]">

          <div className="mb-8">

            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Monthly Trend
            </h2>

<p className="mt-6 text-sm sm:text-base text-gray-400">
              Track your monthly income and expense trends.
            </p>

          </div>

          <div className="h-[280px] sm:h-[380px] lg:h-[500px] w-full">

            <MonthlyTrendChart
              data={monthlyData}
            />

          </div>

        </Card>
<Card className="mt-10 overflow-hidden rounded-[30px] border border-[#D4AF37]/20 bg-[#171717] p-5 sm:p-6 lg:p-8 shadow-[0_0_40px_rgba(212,175,55,.08)]">

  <h2 className="text-2xl sm:text-3xl font-bold text-white">
    Financial Insights
  </h2>

  <p className="mt-2 text-sm sm:text-base text-gray-400">
    Smart insights generated from your financial activity.
  </p>

  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

    <Card className="p-5">
      <p className="text-gray-400 text-sm">
        Savings Rate
      </p>

      <h3 className="mt-3 text-3xl font-bold text-[#FFD700]">
        {savingsRate}%
      </h3>
    </Card>

    <Card className="p-5">
      <p className="text-gray-400 text-sm ">
        Highest Expense
      </p>

      <h3 className="mt-3 text-2xl font-bold text-white">
        {highestExpense
          ? highestExpense.category
          : "-"}
      </h3>
    </Card>

    <Card className="p-5">
      <p className="text-gray-400 text-sm">
        Average Expense
      </p>

      <h3 className="mt-3 text-3xl font-bold text-red-400">
        ₹{Number(averageExpense).toLocaleString()}
      </h3>
    </Card>

    <Card className="p-5">
      <p className="text-gray-400 text-sm">
        Financial Health
      </p>

      <h3 className="mt-3 text-2xl font-bold text-green-400">
        {financialHealth}
      </h3>
    </Card>

  </div>

</Card>
      </PageContainer>
    </MainLayout>
  );
}
