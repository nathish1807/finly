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

  // ==========================
  // Summary Sheet
  // ==========================

  const summary = [
    {
      "FINLY FINANCIAL REPORT": "",
    },
    {},
    {
      Metric: "Total Income",
      Value: totalIncome,
    },
    {
      Metric: "Total Expense",
      Value: totalExpense,
    },
    {
      Metric: "Current Balance",
      Value: balance,
    },
    {
      Metric: "Total Transactions",
      Value: transactions.length,
    },
    {
      Metric: "Generated On",
      Value: new Date().toLocaleString(),
    },
  ];

  // ==========================
  // Transactions Sheet
  // ==========================

  const transactionData = transactions.map((tx, index) => ({
    "S.No": index + 1,
    Date: new Date(tx.date).toLocaleDateString(),
    Category: tx.category,
    Type: tx.type,
    Amount: Number(tx.amount),
    Description: tx.description || "-",
  }));

  // ==========================
  // Workbook
  // ==========================

  const workbook = XLSX.utils.book_new();

  const summarySheet = XLSX.utils.json_to_sheet(summary);

  const transactionSheet =
    XLSX.utils.json_to_sheet(transactionData);

  XLSX.utils.book_append_sheet(
    workbook,
    summarySheet,
    "Summary"
  );

  XLSX.utils.book_append_sheet(
    workbook,
    transactionSheet,
    "Transactions"
  );

  XLSX.writeFile(workbook, "Finly_Report.xlsx");
};
