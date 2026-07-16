import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function IncomeExpenseChart({
  income,
  expense,
}) {
  const data = [
    {
      name: "Finance",
      Income: income,
      Expense: expense,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="Income" fill="#22c55e" />
        <Bar dataKey="Expense" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
}