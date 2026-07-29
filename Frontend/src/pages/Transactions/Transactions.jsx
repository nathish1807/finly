import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import PageContainer from "../../components/PageContainer/PageContainer";
import Card from "../../components/Card/Card";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
// import SuccessScreen from "../../components/SuccessScreen";
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
const [sortBy, setSortBy] = useState("latest");
// const [showTransactionSuccess, setShowTransactionSuccess] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const transactionsPerPage = 10;
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
 const filteredTransactions = transactions
  .filter((tx) => {
    const matchesSearch =
      tx.category?.toLowerCase().includes(search.toLowerCase()) ||
      tx.description?.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      typeFilter === "All" || tx.type === typeFilter;

    const txDate = new Date(tx.date);

    const matchesDate =
      (!startDate || txDate >= new Date(startDate)) &&
      (!endDate || txDate <= new Date(endDate));

    return matchesSearch && matchesType && matchesDate;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.date) - new Date(a.date);

      case "oldest":
        return new Date(a.date) - new Date(b.date);

      case "highest":
        return b.amount - a.amount;

      case "lowest":
        return a.amount - b.amount;

      case "az":
        return a.category.localeCompare(b.category);

      case "za":
        return b.category.localeCompare(a.category);

      default:
        return 0;
    }
  });
  const indexOfLastTransaction =
  currentPage * transactionsPerPage;

const indexOfFirstTransaction =
  indexOfLastTransaction - transactionsPerPage;

const currentTransactions =
  filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

const totalPages = Math.ceil(
  filteredTransactions.length /
    transactionsPerPage
);
  return (
    <MainLayout>
      <PageContainer className="space-y-6">

        <Card className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-r from-[#171717] via-[#1E1B18] to-[#2B1E12] p-8 mb-8">

<div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

<div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">

<div>

<h1 className="text-4xl font-bold text-white">
Transactions
</h1>

<p className="text-gray-400 mt-3 text-lg">
Manage your income and expenses with complete control.
</p>

</div>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

<div className="rounded-2xl bg-[#242424]/80 p-4 sm:px-6 sm:py-4 text-center min-w-0">

<p className="text-gray-400 text-sm">
Income
</p>

<h2 className="text-green-400 text-xl sm:text-2xl font-bold break-words">
₹{
transactions
.filter(t=>t.type==="Income")
.reduce((a,b)=>a+b.amount,0)
.toLocaleString()
}
</h2>

</div>

<div className="rounded-2xl bg-[#242424]/80 p-4 sm:px-6 sm:py-4 text-center min-w-0">

<p className="text-gray-400 text-sm">
Expense
</p>

<h2 className="text-red-400 text-xl sm:text-2xl font-bold break-words">
₹{
transactions
.filter(t=>t.type==="Expense")
.reduce((a,b)=>a+b.amount,0)
.toLocaleString()
}
</h2>

</div>

<div className="rounded-2xl bg-[#242424]/80 p-4 sm:px-6 sm:py-4 text-center min-w-0">

<p className="text-gray-400 text-sm">
Transactions
</p>

<h2 className="text-[#D4AF37] text-xl sm:text-2xl font-bold">
{transactions.length}
</h2>

</div>

</div>

</div>

</Card>

        {/* Add Transaction */}

        <Card className="mb-8 rounded-3xl border border-[#D4AF37]/20 bg-[#171717] p-7 shadow-[0_20px_60px_rgba(0,0,0,.4)]">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <select
              name="account"
              value={form.account}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[#222222] border border-[#333] px-4 py-3 text-white focus:border-[#D4AF37] outline-none transition"
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
  className="
    w-full
    rounded-2xl
    bg-[#222222]
    border
    border-[#333333]
    px-5
    py-4
    text-white
    outline-none
    transition
    focus:border-[#D4AF37]
    focus:ring-2
    focus:ring-[#D4AF37]/20
    appearance-none
    cursor-pointer
  "
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
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
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
              required
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
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

           <button
  type="submit"
  className="w-full rounded-2xl bg-gradient-to-r from-[#8B5E3C] to-[#D4AF37] py-3 font-bold text-black shadow-lg hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(212,175,55,.4)] transition"
>
  {editingId ? "Update Transaction" : "Add Transaction"}
</button>
          </form>

        </Card>
{/* Search & Filter */}

<Card className="mb-8 rounded-3xl border border-[#D4AF37]/20 bg-[#171717] p-6">

  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="rounded-2xl border border-[#333] bg-[#222] px-4 py-3 text-white focus:border-[#D4AF37] outline-none"
    />

    <select
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
      className="rounded-2xl border border-[#333] bg-[#222] px-4 py-3 text-white focus:border-[#D4AF37] outline-none"
    >
      <option value="All">All</option>
      <option value="Income">Income</option>
      <option value="Expense">Expense</option>
    </select>

    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="rounded-2xl border border-[#333] bg-[#222] px-4 py-3 text-white focus:border-[#D4AF37] outline-none"
    />

    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="rounded-2xl border border-[#333] bg-[#222] px-4 py-3 text-white focus:border-[#D4AF37] outline-none"
    />
    <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="rounded-2xl border border-[#333] bg-[#222] px-4 py-3 text-white focus:border-[#D4AF37] outline-none"
>
  <option value="latest">Latest First</option>
  <option value="oldest">Oldest First</option>
  <option value="highest">Highest Amount</option>
  <option value="lowest">Lowest Amount</option>
  <option value="az">Category A-Z</option>
  <option value="za">Category Z-A</option>
</select>

  </div>

</Card>

<Card className="mb-8 rounded-3xl border border-[#D4AF37]/20 bg-[#171717] p-6">

<h2 className="text-2xl font-bold text-white mb-6">
Transaction Statistics
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

<Card className="p-4 sm:p-5 text-center min-w-0">
<p className="text-gray-400">Highest Income</p>

<h2 className="mt-3 text-2xl sm:text-3xl font-bold text-green-400">
₹{
transactions
.filter(t=>t.type==="Income")
.reduce((max,t)=>t.amount>max?t.amount:max,0)
.toLocaleString()
}
</h2>

</Card>

<Card className="p-4 sm:p-5 text-center min-w-0">

<p className="text-gray-400">Highest Expense</p>

<h2 className="mt-3 text-2xl sm:text-3xl font-bold text-red-400">

₹{
transactions
.filter(t=>t.type==="Expense")
.reduce((max,t)=>t.amount>max?t.amount:max,0)
.toLocaleString()
}

</h2>

</Card>

<Card className="p-4 sm:p-5 text-center min-w-0">

<p className="text-gray-400">
Average Transaction
</p>

<h2 className="mt-3text-2xl sm:text-3xl font-bold text-[#FFD700]">

₹{
transactions.length
?Math.round(
transactions.reduce((a,b)=>a+b.amount,0)
/transactions.length
).toLocaleString()
:0
}

</h2>

</Card>

<Card className="p-4 sm:p-5 text-center min-w-0">

<p className="text-gray-400">
Today's Transactions
</p>

<h2 className="mt-3 text-2xl sm:text-3xl font-bold text-cyan-400">

{
transactions.filter(
t=>new Date(t.date).toDateString()===new Date().toDateString()
).length
}

</h2>

</Card>

</div>

</Card>
        {/* Transaction History */}

        <Card className="rounded-3xl border border-[#D4AF37]/20 bg-[#171717] p-7">

          <h2 className="text-2xl font-bold text-white">
            Transaction History
          </h2>

          {filteredTransactions.length === 0 ? (

            <p className="text-gray-500">
              No Transactions Found
            </p>

          ) : (

           <>
  {/* Desktop Table */}
  <div className="hidden lg:block overflow-x-auto">

    <table className="w-full border-separate border-spacing-y-3">

      <thead>

        <tr>

          <th className="text-left text-gray-400 px-4">Category</th>
          <th className="text-left text-gray-400 px-4">Type</th>
          <th className="text-left text-gray-400 px-4">Amount</th>
          <th className="text-left text-gray-400 px-4">Description</th>
          <th className="text-left text-gray-400 px-4">Account</th>
          <th className="text-left text-gray-400 px-4">Date</th>
          <th className="text-center text-gray-400 px-4">Action</th>

        </tr>

      </thead>

      <tbody>

        {currentTransactions.map((tx) => (

          <tr
            key={tx._id}
            className="bg-[#1E1E1E] hover:bg-[#252525] transition rounded-2xl"
          >

            <td className="px-4 py-5 font-semibold text-white">
              {tx.category}
            </td>

            <td
              className={`px-4 py-5 font-bold ${
                tx.type === "Income"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {tx.type}
            </td>

            <td className="px-4 py-5 font-semibold text-white">
              ₹{tx.amount}
            </td>

            <td className="px-4 py-5 text-gray-400">
              {tx.description}
            </td>

            <td className="px-4 py-5 text-gray-300">
              {tx.account?.accountName}
            </td>

            <td className="px-4 py-5 text-gray-400">
              {new Date(tx.date).toLocaleDateString()}
            </td>

            <td className="px-4 py-5">

              <div className="flex items-center gap-3">

             <button
  onClick={() => handleEdit(tx)}
  className="
  relative
  overflow-hidden
  px-6
  py-2.5
  rounded-xl
  font-semibold
 text-black
border-[#D4AF37]
bg-gradient-to-r
from-[#A87342]
via-[#C79B3D]
to-[#E6BE2F]
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
  before:bg-white/30
  before:transition-all
  before:duration-700
  hover:before:left-[150%]
  "
>
  Edit
</button>
                  

              <button
  onClick={() => handleDelete(tx._id)}
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
  Delete
</button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

  {/* Mobile Cards */}

  <div className="lg:hidden space-y-5">

    {currentTransactions.map((tx) => (

      <div
        key={tx._id}
        className="rounded-3xl border border-[#333] bg-[#1C1C1C] p-5 shadow-lg"
      >

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-xl font-bold text-white">
              {tx.category}
            </h3>

            <p className="text-gray-500">
              {tx.account?.accountName}
            </p>

          </div>

          <span
            className={`text-xl font-bold ${
              tx.type === "Income"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {tx.type === "Income" ? "+" : "-"}₹{tx.amount}
          </span>

        </div>

        <div className="mt-4 text-gray-400">

          {tx.description}

        </div>

        <div className="mt-3 text-sm text-gray-500">

          {new Date(tx.date).toLocaleDateString()}

        </div>

        <div className="mt-5 flex gap-3">

         <button
  onClick={() => handleEdit(tx)}
  className="
  relative
  overflow-hidden
  px-6
  py-2.5
  rounded-xl
  font-semibold
 text-black
border-[#D4AF37]
bg-gradient-to-r
from-[#A87342]
via-[#C79B3D]
to-[#E6BE2F]
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
  before:bg-white/30
  before:transition-all
  before:duration-700
  hover:before:left-[150%]
  "
>
  Edit
</button>

         <button
  onClick={() => handleDelete(tx._id)}
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
  Delete
</button>

        </div>

      </div>

    ))}

  </div>
</>


          )}
         <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="
    rounded-xl
    bg-[#252525]
    px-5
    py-2
    text-white
    transition
    hover:bg-[#333333]
    disabled:cursor-not-allowed
    disabled:opacity-40
    "
  >
    Previous
  </button>

  <span className="rounded-xl border border-[#D4AF37]/20 bg-[#1E1E1E] px-5 py-2 font-semibold text-[#FFD700]">
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    disabled={
      currentPage === totalPages ||
      totalPages === 0
    }
    onClick={() => setCurrentPage(currentPage + 1)}
    className="
    rounded-xl
    bg-gradient-to-r
    from-[#8B5E3C]
    to-[#D4AF37]
    px-5
    py-2
    font-bold
    text-black
    transition
    hover:scale-105
    disabled:cursor-not-allowed
    disabled:opacity-40
    "
  >
    Next
  </button>

</div>

        </Card>

      </PageContainer>
      
    </MainLayout>
  );
}