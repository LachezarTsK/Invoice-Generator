import { useState, useEffect } from "react";
import { Popover } from "react-tiny-popover";
import { generatePDF } from "../../util/generatePDFFunction";

import InvoiceIDObject from "../../data/InvoiceIDObject";

/**
 * @param {boolean} allInvoiceFieldsHaveValue
 * @param {ProductObject[]} productsList
 * @param {BilledToObject} billedTo
 * @param {DatesObject} datesObject
 * @return React Component
 */
export default function ButtonGeneratePDFEnclosedInTwoPopovers({
  allInvoiceFieldsHaveValue,
  productsList,
  billedTo,
  datesObject,
}) {
  const [popupNotPossibleToGeneratePDF, setPopupNotPossibleToGeneratePDF] =
    useState(false);

  const [popupPDFGenerated, setPopupPDFGenerated] = useState(false);

  useEffect(() => {
    if (popupNotPossibleToGeneratePDF) {
      const id = setTimeout(() => {
        setPopupNotPossibleToGeneratePDF(false);
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [popupNotPossibleToGeneratePDF]);

  useEffect(() => {
    if (popupPDFGenerated) {
      const id = setTimeout(() => {
        setPopupPDFGenerated(false);
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [popupPDFGenerated]);

  const invoiceID = InvoiceIDObject.prefix + "-" + InvoiceIDObject.integer;

  return (
    <Popover
      isOpen={popupPDFGenerated}
      content={
        <div className="popup positive" style={{ marginLeft: "10px" }}>
          PDF generated!
        </div>
      }
    >
      <Popover
        isOpen={popupNotPossibleToGeneratePDF}
        content={
          <div className="popup negative" style={{ marginRight: "80px" }}>
            Can not generate PDF!
            <br />
            All invoice fields must have valid values!
          </div>
        }
      >
        <button
          className="button"
          onClick={(e) => {
            setPopupNotPossibleToGeneratePDF(!allInvoiceFieldsHaveValue);
            setPopupPDFGenerated(allInvoiceFieldsHaveValue);
            generatePDF(productsList, billedTo, datesObject, invoiceID);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Generate PDF
        </button>
      </Popover>
    </Popover>
  );
}
