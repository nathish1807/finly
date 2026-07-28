import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadReport = (transactions) => {
  const doc = new jsPDF("p", "mm", "a4");

  // ===============================
  // Calculations
  // ===============================

  const totalIncome = transactions
    .filter((tx) => tx.type === "Income")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "Expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const balance = totalIncome - totalExpense;

  const savingsRate =
    totalIncome === 0
      ? 0
      : ((balance / totalIncome) * 100).toFixed(1);

  // ===============================
  // HEADER
  // ===============================

  doc.setFillColor(20, 20, 20);
  doc.rect(0, 0, 210, 42, "F");

  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("FINLY", 105, 15, { align: "center" });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(17);
  doc.text("Financial Report", 105, 26, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.setTextColor(180);

  doc.text(
    `Generated : ${new Date().toLocaleDateString()}`,
    105,
    35,
    {
      align: "center",
    }
  );

  // ===============================
  // SUMMARY
  // ===============================

  let y = 55;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(30);

  doc.text("Financial Summary", 14, y);

  y += 10;

  const drawCard = (
  x,
  title,
  value,
  bg1,
  bg2,
  textColor
) => {

  // Shadow
  doc.setFillColor(25,25,25);
  doc.roundedRect(x+1, y+1, 56, 32, 5,5,"F");

  // Card
  doc.setFillColor(...bg1);
  doc.roundedRect(x, y, 56, 32, 5,5,"F");

  // Top highlight
  

  // Border
  doc.setDrawColor(212,175,55);
  doc.setLineWidth(0.3);
  doc.roundedRect(x,y,56,32,5,5);

  // Title
  doc.setFont("helvetica","bold");
  doc.setFontSize(10);
  doc.setTextColor(220,220,220);
  doc.text(title,x+5,y+11);

  // Value
  doc.setFontSize(17);
  doc.setTextColor(...textColor);
  doc.text(value,x+5,y+24);
};

  // Income
drawCard(
  14,
  "Income",
  `Rs.${totalIncome.toLocaleString()}`,
  [22,35,29],      // Dark Emerald
  [36,84,54],      // Emerald Shine
  [212,255,223]    // Light Emerald
);

// Expense
drawCard(
  77,
  "Expense",
  `Rs.${totalExpense.toLocaleString()}`,
  [42,18,18],      // Burgundy
  [105,32,32],     // Shine
  [255,225,225]
);

// Balance
drawCard(
  140,
  "Balance",
  `Rs.${balance.toLocaleString()}`,
  [42,34,18],      // Dark Gold
  [168,128,34],    // Gold Shine
  [255,245,190]
);

  y += 45;

  // ===============================
  // INSIGHTS
  // ===============================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(30);

  doc.text("Quick Insights", 14, y);

  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const insights = [
    `Total Transactions : ${transactions.length}`,
    `Savings Rate : ${savingsRate}%`,
    `Total Income : Rs.${totalIncome.toLocaleString()}`,
    `Total Expense : Rs.${totalExpense.toLocaleString()}`,
    `Current Balance : Rs.${balance.toLocaleString()}`,
  ];

  insights.forEach((item) => {
    doc.circle(16, y - 1, 0.8, "F");
    doc.text(item, 20, y);
    y += 8;
  });

  y += 5;

  // ===============================
  // TABLE TITLE
  // ===============================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);

  doc.text("Transaction History", 14, y);

  y += 6;

  // ===============================
  // TABLE
  // ===============================

  autoTable(doc, {
    startY: y,

    head: [
      [
        "Category",
        "Type",
        "Amount",
        "Description",
        "Date",
      ],
    ],

    body: transactions.map((tx) => [
      tx.category,
      tx.type,
      `Rs.${Number(tx.amount).toLocaleString()}`,
      tx.description || "-",
      new Date(tx.date).toLocaleDateString(),
    ]),

    styles: {
      fontSize: 10,
      cellPadding: 4,
      halign: "center",
      valign: "middle",
      lineColor: [220, 220, 220],
      lineWidth: 0.2,
    },

    headStyles: {
      fillColor: [212, 175, 55],
      textColor: [20, 20, 20],
      fontStyle: "bold",
      fontSize: 11,
    },

    bodyStyles: {
      fillColor: [250, 250, 250],
      textColor: [40, 40, 40],
    },

    alternateRowStyles: {
      fillColor: [242, 242, 242],
    },

    margin: {
      left: 14,
      right: 14,
    },

    didParseCell: (data) => {
      if (
        data.section === "body" &&
        data.column.index === 1
      ) {
        if (data.cell.raw === "Income") {
          data.cell.styles.textColor = [
            11,
            94,
            57,
          ];
          data.cell.styles.fontStyle = "bold";
        }

        if (data.cell.raw === "Expense") {
          data.cell.styles.textColor = [
            127,
            29,
            29,
          ];
          data.cell.styles.fontStyle = "bold";
        }
      }
    },
  });

  // ===============================
  // FOOTER
  // ===============================

  const pageCount = doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    const pageHeight = doc.internal.pageSize.height;

    doc.setDrawColor(212, 175, 55);

    doc.line(
      14,
      pageHeight - 18,
      196,
      pageHeight - 18
    );

    doc.setFontSize(10);
    doc.setTextColor(120);

    doc.text(
      "Generated by Finly",
      14,
      pageHeight - 10
    );

    doc.text(
      `Page ${i} of ${pageCount}`,
      170,
      pageHeight - 10
    );
  }

  // ===============================
  // SAVE
  // ===============================

  doc.save("Finly_Financial_Report.pdf");
};