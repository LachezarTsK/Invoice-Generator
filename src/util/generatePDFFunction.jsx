import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import {
  rocketHeaderImageBase64,
  rocketFooterImageBase64,
} from "../images/headerAndFooterRocketImageBase64";
import { notAllInvoiceFieldsHaveValue } from "./checkingFunctions";
import { formatDate, formatNumber } from "./formattingFunctions";
import { calculateSubTotal } from "./generalPurposeFunctions";

/**
 *
 * @param {ProductObject[]} productsList
 * @param {BilledToObject} billedTo
 * @param {DatesObject} datesObject
 * @param {number} invoiceID
 * @return {void}
 */
export async function generatePDF(
  productsList,
  billedTo,
  datesObject,
  invoiceID,
) {
  if (
    notAllInvoiceFieldsHaveValue(productsList, billedTo, datesObject, invoiceID)
  ) {
    return;
  }

  const subTotal = calculateSubTotal(productsList);
  const tax = subTotal * 0.1;
  const total = subTotal + tax;

  const invoice = new jsPDF("l", "px", "letter");

  /**
   * ----- Header for first page -----
   */
  invoice.addImage(rocketHeaderImageBase64, "JPEG", 30, 28, 100, 60);

  /**
   * ----- Name and Address of Invoice-issuing company, generated automatically -----
   */
  const invoiceIssuingCompanyNameAndAddress = [
    ["The Rocket Company"],
    [12 + " " + "Solid Booster Street"],
    [12345 + " " + "Cosmos City"],
    ["Star State"],
    ["Star Country"],
  ];

  autoTable(invoice, {
    head: [["Issued By"]],
    body: invoiceIssuingCompanyNameAndAddress,
    margin: { left: 400 },
    columnStyles: {
      0: {
        halign: "left",
        cellWidth: 160,
        fillColor: "#D0FFBC",
        fontStyle: "bold",
      },
    },
  });

  /**
   * -----
   * Date Issued, Invoice ID, Tax No: 12 345 678 900
   * Due Date, Amount Due, BIC WESTGBAV, IBAN GB82 WEST 1234 5678 7654 32
   * 
   * Tax No, BIC, IBAN of Invoice-issuing company, generated automatically
   * -----
   */
  const ID = [
    ["Date Issued", "Invoice ID", "", "Tax No 12 345 678 900"],
    [formatDate(datesObject.dateIssued), invoiceID, "", "BIC WESTGBAV"],
    ["Due Date", "Amount Due", "", "IBAN GB82 WEST 1234 5678 7654 32"],
    [
      formatDate(datesObject.dueDate),
      productsList[0].currency + " " + formatNumber(total),
    ],
  ];

  autoTable(invoice, {
    body: ID,
    columnStyles: {
      0: {
        halign: "left",
        cellWidth: 60,
        fillColor: [144, 213, 255],
        fontStyle: "bold",
      },
      1: {
        halign: "right",
        cellWidth: 100,
        fillColor: [144, 213, 255],
        fontStyle: "bold",
      },
      2: {
        halign: "right",
        cellWidth: 210,
        fillColor: "white",
      },
      3: {
        halign: "left",
        cellWidth: 160,
        fillColor: [144, 213, 255],
        fontStyle: "bold",
      },
    },
  });

  /**
   * ----- Billed To -----
   */
  const {
    companyName,
    streetNumber,
    streetName,
    postalCode,
    city,
    state,
    country,
  } = billedTo;

  const recepient = [
    [companyName],
    [streetNumber + " " + streetName],
    [postalCode + " " + city],
    [state],
    [country],
  ];

  autoTable(invoice, {
    head: [["Billed To"]],
    body: recepient,
    columnStyles: {
      0: {
        halign: "left",
        cellWidth: 160,
        fillColor: "#D0FFBC",
        fontStyle: "bold",
      },
    },
  });

  /**
   * ----- Table for List of Products -----
   */
  const header = [
    ["No", "Product", "Unit", "Quantity", "Currency", "Price", "Amount"],
  ];

  const data = [];

  for (let i = 0; i < productsList.length; ++i) {
    data.push([
      i + 1,
      productsList[i].name,
      productsList[i].unitOfMeasure,
      formatNumber(productsList[i].quantity),
      productsList[i].currency,
      formatNumber(productsList[i].price),
      formatNumber(productsList[i].quantity * productsList[i].price),
    ]);
  }

  autoTable(invoice, {
    head: header,
    styles: {
      halign: "right",
      margin: { top: 200, bottom: 200 },
    },
    body: data,
    columnStyles: {
      0: { halign: "right", cellWidth: 20, fontStyle: "bold" },
      1: { halign: "right", cellWidth: 100, fontStyle: "bold" },
      2: { halign: "right", cellWidth: 60, fontStyle: "bold" },
      3: { halign: "right", cellWidth: 100, fontStyle: "bold" },
      4: { halign: "right", cellWidth: 50, fontStyle: "bold" },
      5: { halign: "right", cellWidth: 80, fontStyle: "bold" },
      6: { halign: "right", cellWidth: 100, fontStyle: "bold" },
    },
    bodyStyles: { fillColor: "#D6FFFF" },
    alternateRowStyles: { fillColor: "#DFF5F5" },
  });

  autoTable(invoice, {
    body: [
      ["Subtotal", productsList[0].currency, `${formatNumber(subTotal)}`],
      ["Tax 10%", productsList[0].currency, `${formatNumber(tax)}`],
      ["Total", productsList[0].currency, `${formatNumber(total)}`],
    ],
    margin: { left: 290 },
    columnStyles: {
      0: { halign: "left", cellWidth: 100, fontStyle: "bold" },
      1: { halign: "center", cellWidth: 50, fontStyle: "bold" },
      2: { halign: "right", cellWidth: 100, fontStyle: "bold" },
    },
    bodyStyles: { fillColor: "#D6FFFF" },
    alternateRowStyles: { fillColor: "#DFF5F5" },
  });

  /**
   * ----- Footer for every generated page -----
   */
  const numberOfPages = invoice.getNumberOfPages();
  const xLogo = 30;
  const yLogo = invoice.internal.pageSize.getHeight() - 28;

  const xText = 90;
  const yText = invoice.internal.pageSize.getHeight() - 10;
  const whiteSpaceInserter = "        ";

  for (let i = 1; i <= numberOfPages; ++i) {
    invoice.setPage(i);
    invoice.addImage(rocketFooterImageBase64, "JPEG", xLogo, yLogo, 510, 26);
    invoice.setFontSize(10);
    invoice.setFont("Helvetica");
    invoice.text(
      `page ${i} of ${numberOfPages} ${whiteSpaceInserter} The Rocket Company${whiteSpaceInserter}Tax No 12 345 678 900${whiteSpaceInserter}BIC WESTGBAV${whiteSpaceInserter}IBAN GB82 WEST 1234 5678 7654 32`,
      xText,
      yText,
    );
  }

  invoice.save("Invoice.pdf");
}
