import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadReport = (transactions) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Personal Finance Management Report", 14, 20);

  doc.setFontSize(11);
  doc.text(
    `Generated On: ${new Date().toLocaleDateString()}`,
    14,
    30
  );

  const rows = transactions.map((tx) => [
    tx.category,
    tx.type,
    `₹${tx.amount}`,
    tx.description || "-",
    new Date(tx.date).toLocaleDateString(),
  ]);

  autoTable(doc, {
    startY: 40,
    head: [["Category", "Type", "Amount", "Description", "Date"]],
    body: rows,
  });

  doc.save("Finance_Report.pdf");
};