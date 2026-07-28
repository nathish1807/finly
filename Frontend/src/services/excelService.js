import * as XLSX from "xlsx";

export const downloadExcel = (transactions) => {
  if (!transactions.length) return;

  const totalIncome = transactions
    .filter((tx) => tx.type === "Income")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "Expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const balance = totalIncome - totalExpense;

  const data = transactions.map((tx) => ({
    Category: tx.category,
    Type: tx.type,
    Amount: Number(tx.amount),
    Description: tx.description || "-",
    Date: new Date(tx.date).toLocaleDateString(),
  }));

  // Summary Sheet
  const summary = [
    {
      "Total Income": totalIncome,
      "Total Expense": totalExpense,
      Balance: balance,
      Transactions: transactions.length,
    },
  ];

  const workbook = XLSX.utils.book_new();

  const summarySheet = XLSX.utils.json_to_sheet(summary);

  XLSX.utils.book_append_sheet(
    workbook,
    summarySheet,
    "Summary"
  );

  const transactionSheet =
    XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(
    workbook,
    transactionSheet,
    "Transactions"
  );

  XLSX.writeFile(
    workbook,
    "Finly_Report.xlsx"
  );
};