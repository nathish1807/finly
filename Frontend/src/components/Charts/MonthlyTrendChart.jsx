import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function MonthlyTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>

        <CartesianGrid
          stroke="#2A2A2A"
          strokeDasharray="5 5"
        />

        <XAxis
          dataKey="month"
          stroke="#BDBDBD"
        />

        <YAxis
          stroke="#BDBDBD"
        />

        <Tooltip
          contentStyle={{
            background: "#171717",
            border: "1px solid #D4AF37",
            borderRadius: 18,
            color: "#fff",
          }}
        />

        <Legend />

        <Line
          type="monotone"
          dataKey="Income"
          stroke="#22C55E"
          strokeWidth={4}
          dot={{
            r: 6,
          }}
        />

        <Line
          type="monotone"
          dataKey="Expense"
          stroke="#EF4444"
          strokeWidth={4}
          dot={{
            r: 6,
          }}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}