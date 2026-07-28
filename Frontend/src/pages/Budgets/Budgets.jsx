import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import PageContainer from "../../components/PageContainer/PageContainer";
import Card from "../../components/Card/Card";
import toast from "react-hot-toast";

import SuccessScreen from "../../components/SuccessScreen";
import {
  getBudgets,
  createBudget,
  deleteBudget,
} from "../../services/budgetService";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data.budgets);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
  if (!category || !limit) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    await createBudget({
  category,
  limit,
});

setShowSuccess(true);

setTimeout(() => {
  setShowSuccess(false);
}, 2200);

setCategory("");
setLimit("");

fetchBudgets();

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to add budget"
    );

    console.log(error);
  }
};

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this budget?")) return;

  try {
    await deleteBudget(id);

    toast.success("Budget Deleted Successfully");

    fetchBudgets();

  } catch (error) {

    toast.error("Failed to delete budget");

    console.log(error);
  }
};

  return (
    <MainLayout>
      <PageContainer>

        {/* Heading */}

        <Card className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-r from-[#171717] via-[#201A15] to-[#322113] p-8 mb-8">

<div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

<div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">

<div>

<h1 className="text-4xl font-bold text-white">
  Budget Planner
</h1>

<p className="text-gray-400 mt-3 text-lg">
Track spending and stay within your monthly limits.
</p>

</div>

<div className="grid grid-cols-3 gap-5">

<div className="rounded-2xl bg-[#242424]/80 p-5 text-center">

<p className="text-gray-400 text-sm">
Budgets
</p>

<h2 className="text-[#D4AF37] text-2xl font-bold">
{budgets.length}
</h2>

</div>

<div className="rounded-2xl bg-[#242424]/80 p-5 text-center">

<p className="text-gray-400 text-sm">
Spent
</p>

<h2 className="text-red-400 text-2xl font-bold">

₹{budgets.reduce((t,b)=>t+b.spent,0).toLocaleString()}

</h2>

</div>

<div className="rounded-2xl bg-[#242424]/80 p-5 text-center">

<p className="text-gray-400 text-sm">
Remaining
</p>

<h2 className="text-green-400 text-2xl font-bold">

₹{budgets.reduce((t,b)=>t+b.remaining,0).toLocaleString()}

</h2>

</div>

</div>

</div>

</Card>
        {/* Add Budget */}

       <Card className="mb-8 rounded-3xl border border-[#D4AF37]/20 bg-[#171717] p-7 shadow-[0_25px_60px_rgba(0,0,0,.45)]">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
w-full
rounded-2xl
bg-[#222222]
border
border-[#333333]
px-5
py-4
text-white
placeholder:text-gray-500
outline-none
transition
focus:border-[#D4AF37]
focus:ring-2
focus:ring-[#D4AF37]/20
"
            />

            <input
              type="number"
              placeholder="Budget Limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="
w-full
rounded-2xl
bg-[#222222]
border
border-[#333333]
px-5
py-4
text-white
placeholder:text-gray-500
outline-none
transition
focus:border-[#D4AF37]
focus:ring-2
focus:ring-[#D4AF37]/20
"
            />

            <div className="md:col-span-2">
              <button
                onClick={handleCreate}
                className="
w-full
rounded-2xl
py-4
font-bold
text-black
bg-gradient-to-r
from-[#8B5E3C]
to-[#D4AF37]
hover:scale-[1.02]
transition
shadow-lg
hover:shadow-[0_0_35px_rgba(212,175,55,.35)]
"
              >
                Add Budget
              </button>
            </div>

          </div>

        </Card>

        {/* Budget List */}

        {budgets.length === 0 ? (

         <div className="py-10 text-center">

<div className="text-6xl">
💰
</div>

<h2 className="mt-4 text-2xl font-bold text-white">

No Budgets Yet

</h2>

<p className="mt-2 text-gray-500">

Create your first budget to start tracking your spending.

</p>

</div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {budgets.map((budget) => (

              <Card
  key={budget._id}
  className="
  relative
  overflow-hidden
  rounded-3xl
  border
  border-[#D4AF37]/20
  bg-gradient-to-b
  from-[#1B1B1B]
  to-[#141414]
  p-8
  transition-all
  duration-300
  hover:border-[#D4AF37]/40
  hover:-translate-y-1
  "
>

                <div className="flex justify-between items-center">

                  <h2 className="text-2xl font-bold text-white">
                    {budget.category}
                  </h2>

                 <span
className="
rounded-full
bg-gradient-to-r
from-[#8B5E3C]
to-[#D4AF37]
px-4
py-2
text-black
font-bold
text-sm
"
>
                    ₹{budget.limit}
                  </span>

                </div>

              <div className="mt-6 space-y-4">

<div className="flex justify-between">

<span className="text-gray-400">
Spent
</span>

<span className="text-red-400 font-bold">
₹{budget.spent}
</span>

</div>

<div className="flex justify-between">

<span className="text-gray-400">
Remaining
</span>

<span className="text-green-400 font-bold">
₹{budget.remaining}
</span>

</div>

</div>

                {/* Progress */}

              {/* Progress */}

<div className="mt-6">

  {/* Progress Track */}
  <div className="h-4 w-full overflow-hidden rounded-full bg-[#2A2A2A] border border-[#3A3A3A]">

    {/* Progress Fill */}
    <div
      className="
      relative
      h-full
      rounded-full
      overflow-hidden
      bg-gradient-to-r
      from-[#4A3A15]
      via-[#8B6B16]
      via-[#C89A4A]
      to-[#FFF1B5]
      transition-all
      duration-700
      "
      style={{
        width: `${Math.min(budget.percentage, 100)}%`,
      }}
    >
      {/* Shine Effect */}
      <div
        className="
        absolute
        top-0
        -left-1/3
        h-full
        w-1/3
        skew-x-[-25deg]
        bg-white/30
        animate-[shine_2.5s_linear_infinite]
        "
      />
    </div>

  </div>

  <div className="flex justify-between mt-5">

    <span className="rounded-full bg-[#D4AF37]/10 px-4 py-1 text-[#D4AF37] text-sm font-semibold">
      {budget.percentage.toFixed(0)}%
    </span>

    {budget.percentage >= 100 && (
      <span className="text-red-400 font-semibold">
        Budget Exceeded
      </span>
    )}

  </div>




{/* 
                  <div className="flex justify-between mt-2">

                    <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-[#D4AF37] text-sm font-semibold">
                      {budget.percentage.toFixed(0)}%
                    </span>

                    {budget.percentage >= 100 && (
                      <span className="text-red-400 font-bold">
                        Budget Exceeded
                      </span>
                    )}

                  </div> */}

                </div>

               <button
  onClick={() => handleDelete(budget._id)}
  className="
  relative
  overflow-hidden
  px-6
  py-2.5
  rounded-xl
  font-semibold
  text-white
  border
  border-[#D84C4C]
  bg-gradient-to-r
  from-[#5B1010]
  via-[#A31F1F]
  to-[#D83434]
  transition-all
  duration-300
  hover:scale-105
  active:scale-95
  before:absolute
  before:top-0
  before:-left-full
  before:h-full
  before:w-1/2
  before:rotate-12
  before:bg-white/25
  before:transition-all
  before:duration-700
  hover:before:left-[150%]
  "
>
  Delete Budget
</button>

              </Card>

            ))}

          </div>

        )}
        

      </PageContainer>
      {showSuccess && (

<SuccessScreen

title="Budget Added Successfully"

subtitle="Your monthly budget has been created."

/>

)}
    </MainLayout>
  );
}