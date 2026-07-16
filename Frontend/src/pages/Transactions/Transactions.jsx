import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import PageContainer from "../../components/PageContainer/PageContainer";
import Card from "../../components/Card/Card";
import toast from "react-hot-toast";

import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../services/transactionService";

import { getAccounts } from "../../services/accountService";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
const [typeFilter, setTypeFilter] = useState("All");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
  const [form, setForm] = useState({
    account: "",
    type: "Expense",
    category: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    fetchTransactions();
    fetchAccounts();
  }, []);

  // Get Transactions
  const fetchTransactions = async () => {
  try {
    const data = await getTransactions();
    setTransactions(data.transactions);
  } catch (error) {
    toast.error("Failed to load transactions");
    console.log(error);
  }
};

  // Get Accounts
  const fetchAccounts = async () => {
  try {
    const data = await getAccounts();
    setAccounts(data.accounts);
  } catch (error) {
    toast.error("Failed to load accounts");
    console.log(error);
  }
};

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  

  // Add Transaction
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
      await updateTransaction(editingId, form);
      toast.success("Transaction Updated Successfully");
    } else {
      await addTransaction(form);
      toast.success("Transaction Added Successfully");
    }

    setEditingId(null);

    setForm({
      account: "",
      type: "Expense",
      category: "",
      amount: "",
      description: "",
    });

    fetchTransactions();
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
    console.log(error);
  }
};

const handleEdit = (tx) => {
  setEditingId(tx._id);

  setForm({
    account: tx.account?._id || "",
    type: tx.type,
    category: tx.category,
    amount: tx.amount,
    description: tx.description,
  });

  toast.success("Editing Transaction");
};
  // Delete Transaction
 const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this transaction?"
  );

  if (!confirmDelete) return;

  try {
    await deleteTransaction(id);

    toast.success("Transaction Deleted Successfully");

    fetchTransactions();
  } catch (error) {
    toast.error("Failed to delete transaction");
    console.log(error);
  }
};
  const filteredTransactions = transactions.filter((tx) => {
  const matchesSearch =
    tx.category
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    tx.description
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesType =
    typeFilter === "All" || tx.type === typeFilter;

  const txDate = new Date(tx.date);

  const matchesDate =
    (!startDate || txDate >= new Date(startDate)) &&
    (!endDate || txDate <= new Date(endDate));

  return matchesSearch && matchesType && matchesDate;
});
  return (
    <MainLayout>
      <PageContainer className="space-y-6">

        <div className="mb-8">

<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">  Transactions
</h1>

<p className="text-gray-500 mt-2">
Manage all your income and expense records.
</p>

</div>

        {/* Add Transaction */}

        <Card className="mb-6 p-4 sm:p-6 rounded-2xl shadow-sm">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <select
              name="account"
              value={form.account}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select Account</option>

              {accounts.map((account) => (
                <option
                  key={account._id}
                  value={account._id}
                >
                  {account.accountName}
                </option>
              ))}
            </select>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

           <button
  type="submit"
  className="
w-full
bg-blue-600
hover:bg-blue-700
text-white
font-semibold
py-3
rounded-xl
shadow-md
transition
duration-200
"
>
  {editingId ? "Update Transaction" : "Add Transaction"}
</button>
          </form>

        </Card>
{/* Search & Filter */}

<Card className="mb-6 p-4 sm:p-6">

  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-xl p-3"
    />

    <select
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
      className="border rounded-xl p-3"
    >
      <option value="All">All</option>
      <option value="Income">Income</option>
      <option value="Expense">Expense</option>
    </select>

    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="border rounded-xl p-3"
    />

    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="border rounded-xl p-3"
    />

  </div>

</Card>
        {/* Transaction History */}

        <Card className="p-4 sm:p-6 rounded-2xl shadow-sm">

          <h2 className="text-2xl font-bold mb-5">
            Transaction History
          </h2>

          {filteredTransactions.length === 0 ? (

            <p className="text-gray-500">
              No Transactions Found
            </p>

          ) : (

            <table className="w-full border-collapse">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">Category</th>
                  <th className="text-left py-3">Type</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Description</th>
                  <th className="text-left py-3">Account</th>
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Action</th>

                </tr>

              </thead>

              <tbody>

{filteredTransactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-b"
                  >

                    <td className="py-3">
                      {tx.category}
                    </td>

                    <td
                      className={`py-3 font-semibold ${
                        tx.type === "Income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.type}
                    </td>

                    <td className="py-3">
                      ₹{tx.amount}
                    </td>

                    <td className="py-3">
                      {tx.description}
                    </td>

                    <td className="py-3">
                      {tx.account?.accountName}
                    </td>

                    <td className="py-3">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>

                    <td className="py-3">

<div className="flex flex-col sm:flex-row gap-2">
  <button
    onClick={() => handleEdit(tx)}
    className="
bg-green-600
hover:bg-green-700
text-white
font-medium
px-4
py-2
rounded-xl
transition
"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(tx._id)}
className="
bg-red-600
hover:bg-red-700
text-white
font-medium
px-4
py-2
rounded-xl
transition
"  >
    Delete
  </button>

</div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </Card>

      </PageContainer>
    </MainLayout>
  );
}