import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

export default function IncomeExpenseChart({
  income,
  expense,
}) {
  const data = [
    {
      name: "Finance",
      income,
      expense,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 10,
          bottom: 20,
        }}
      >
        {/* Premium Gradients */}
        <defs>
          {/* Income */}
          <linearGradient
            id="incomeGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#7DFFD1" />
            <stop offset="35%" stopColor="#36EFA3" />
            <stop offset="70%" stopColor="#12C77B" />
            <stop offset="100%" stopColor="#0E8E5C" />
          </linearGradient>

          {/* Expense */}
          <linearGradient
            id="expenseGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#FF8A8A" />
            <stop offset="35%" stopColor="#FF5B5B" />
            <stop offset="70%" stopColor="#E53935" />
            <stop offset="100%" stopColor="#B71C1C" />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="#2A2A2A"
          strokeDasharray="4 4"
          vertical={false}
        />

        <XAxis
          dataKey="name"
          tick={{
            fill: "#A7A7A7",
            fontSize: 14,
          }}
          axisLine={{
            stroke: "#3B3B3B",
          }}
          tickLine={false}
        />

        <YAxis
          tick={{
            fill: "#A7A7A7",
            fontSize: 14,
          }}
          axisLine={{
            stroke: "#3B3B3B",
          }}
          tickLine={false}
        />

        <Tooltip
          cursor={{
            fill: "rgba(212,175,55,.08)",
          }}
          contentStyle={{
            background: "#171717",
            border: "1px solid #D4AF37",
            borderRadius: "16px",
            boxShadow: "0 0 30px rgba(212,175,55,.18)",
          }}
          labelStyle={{
            color: "#D4AF37",
            fontWeight: 700,
          }}
        />

        <Legend
          iconType="circle"
          wrapperStyle={{
            color: "#F5F5F5",
            fontSize: 15,
            fontWeight: 600,
            paddingTop: 20,
          }}
        />

        <Bar
          dataKey="income"
          name="Income"
          radius={[16, 16, 0, 0]}
          fill="url(#incomeGradient)"
          animationDuration={1200}
        />

        <Bar
          dataKey="expense"
          name="Expense"
          radius={[16, 16, 0, 0]}
          fill="url(#expenseGradient)"
          animationDuration={1200}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}