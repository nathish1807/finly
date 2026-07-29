import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#D4AF37", // Premium Gold
  "#C89A4A", // Rich Gold
  "#8B5E3C", // Bronze
  "#F4E7C1", // Champagne
  "#B08D57", // Antique Gold
  "#6E5A3A", // Dark Bronze
  "#A68A64", // Satin Gold
  "#E6D3A3", // Soft Gold
];
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        background: "rgba(20,20,20,.97)",
        border: "1px solid #FFD700",
        borderRadius: "18px",
        padding: "14px 22px",
        color: "#D9A35D",
        fontWeight: 600,
        boxShadow: "0 0 30px rgba(255,215,0,.25)",
        whiteSpace: "nowrap",
      }}
    >
      {payload[0].payload.category} : ₹
      {Number(payload[0].value).toLocaleString()}
    </div>
  );
};
export default function ExpenseChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
   <div
className="
relative
w-full
h-full
overflow-visible
rounded-[32px]
border
border-[#D4AF37]/25
bg-gradient-to-br
from-[#181818]
via-[#1B1B1B]
to-[#121212]
p-5
sm:p-6
lg:p-8
shadow-[0_20px_80px_rgba(0,0,0,.45)]
"
>

      {/* Premium Background Glow */}
     <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[140px]" />

      {/* Center Glass Card */}
      <div className="pointer-events-none absolute left-1/2 top-[41.5%] z-[1] flex h-28 w-28 sm:h-28 sm:w-28 lg:h-36 lg:w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#D4AF37]/20 bg-white/5 backdrop-blur-xl shadow-[0_0_35px_rgba(255,215,0,.15)]">

       <p className="text-[9px] sm:text-xs uppercase tracking-[3px] text-gray-400">
          Total
        </p>

        <h2 className="mt-1 text-lg sm:text-xl lg:text-2xl font-bold text-[#FFD700]">
          ₹{total.toLocaleString()}
        </h2>

      </div>

     <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          <defs>
            <filter id="shadow">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="10"
                floodColor="#FFD700"
                floodOpacity="0.25"
              />
            </filter>
          </defs>

          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
cy="50%"
innerRadius={window.innerWidth < 640 ? 60 : 80}
outerRadius={window.innerWidth < 640 ? 95 : 120}
  // activeOuterRadius={130}
            cornerRadius={8}
            paddingAngle={5}
            animationDuration={1400}
          label={false}
           
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                stroke="#171717"
                strokeWidth={3}
              />
            ))}
          </Pie>

        <Tooltip
content={<CustomTooltip />}
offset={35}
wrapperStyle={{
  zIndex: 9999,
}}
allowEscapeViewBox={{
  x: true,
  y: true,
}}
cursor={false}
/>
          <Legend
iconType="circle"
iconSize={10}
wrapperStyle={{
fontSize:12,
fontWeight:600,
color:"#ECECEC",
paddingTop:20,

}}
/>

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}