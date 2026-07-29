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
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
  data={data}
  margin={{
    top: 10,
    right: 15,
    left: -20,
    bottom: 20,
  }}
>

        <CartesianGrid
          stroke="#2A2A2A"
          strokeDasharray="5 5"
        />

        <XAxis
  dataKey="month"
  stroke="#BDBDBD"
  tick={{ fontSize: 11 }}
  interval="preserveStartEnd"
/>

       <YAxis
  stroke="#BDBDBD"
  width={40}
  tick={{ fontSize: 11 }}
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
          strokeWidth={3}
          dot={{
            r: 4,
          }}
        />

        <Line
          type="monotone"
          dataKey="Expense"
          stroke="#EF4444"
          strokeWidth={4}
          dot={{
            r: 4,
          }}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}