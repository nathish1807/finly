import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import PageContainer from "../../components/PageContainer/PageContainer";
import Card from "../../components/Card/Card";

import {
  getBudgets,
  createBudget,
  deleteBudget,
} from "../../services/budgetService";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

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
      alert("Please fill all fields");
      return;
    }

    try {
      await createBudget({
        category,
        limit,
      });

      setCategory("");
      setLimit("");

      fetchBudgets();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this budget?")) return;

    try {
      await deleteBudget(id);
      fetchBudgets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <PageContainer>

        {/* Heading */}

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Budgets
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your monthly spending limits.
          </p>
        </div>

        {/* Add Budget */}

        <Card className="mb-8 p-4 sm:p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-xl p-3 w-full"
            />

            <input
              type="number"
              placeholder="Budget Limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="border rounded-xl p-3 w-full"
            />

            <div className="md:col-span-2">
              <button
                onClick={handleCreate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Add Budget
              </button>
            </div>

          </div>

        </Card>

        {/* Budget List */}

        {budgets.length === 0 ? (

          <Card className="p-6 text-center">
            <p className="text-gray-500">
              No Budgets Found
            </p>
          </Card>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {budgets.map((budget) => (

              <Card
                key={budget._id}
                className="p-5 rounded-2xl shadow-sm"
              >

                <div className="flex justify-between items-center">

                  <h2 className="text-xl font-bold">
                    {budget.category}
                  </h2>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    ₹{budget.limit}
                  </span>

                </div>

                <div className="mt-5 space-y-2 text-gray-700">

                  <p>
                    <strong>Spent:</strong> ₹{budget.spent}
                  </p>

                  <p>
                    <strong>Remaining:</strong> ₹{budget.remaining}
                  </p>

                </div>

                {/* Progress */}

                <div className="mt-5">

                  <div className="w-full bg-gray-200 rounded-full h-3">

                    <div
                      className={`h-3 rounded-full ${
                        budget.percentage >= 100
                          ? "bg-red-600"
                          : "bg-green-600"
                      }`}
                      style={{
                        width: `${Math.min(
                          budget.percentage,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between mt-2">

                    <span className="text-sm font-medium">
                      {budget.percentage.toFixed(0)}%
                    </span>

                    {budget.percentage >= 100 && (
                      <span className="text-red-600 text-sm font-bold">
                        Budget Exceeded
                      </span>
                    )}

                  </div>

                </div>

                <button
                  onClick={() =>
                    handleDelete(budget._id)
                  }
                  className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition"
                >
                  Delete Budget
                </button>

              </Card>

            ))}

          </div>

        )}

      </PageContainer>
    </MainLayout>
  );
}