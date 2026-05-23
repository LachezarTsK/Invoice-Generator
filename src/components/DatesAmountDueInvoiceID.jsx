import { useState } from "react";
import { calculateSubTotal } from "../util/generalPurposeFunctions";
import { formatNumber } from "../util/formattingFunctions";

import DatesObject from "../data/DatesObject";
import InputDateIssuedEnclosedInOnePopover from "./ButtonsEnclosedInPopovers/InputDateIssuedEnclosedInOnePopover";
import InputDueDateEnclosedInOnePopover from "./ButtonsEnclosedInPopovers/InputDueDateEnclosedInOnePopover";

import "../styles/stylesDate.css";
import "../styles/stylesPopup.css";

/**
 * @param {function} setDatesObject
 * @param {string} invoiceID
 * @param {string} currency
 * @param {ProductObject[]} productsList
 * @return React Component
 */
export default function DatesAmountDueInvoiceID({
  setDatesObject,
  currency,
  productsList,
  InvoiceIDObject,
}) {
  const [dateIssued, setDateIssued] = useState("");
  const [dueDate, setDueDate] = useState("");

  /**
   * In certain cases, it is legal to issue an invoice with a date in the past.
   * That is why, there is no check for whether the date of issue is in the past.
   *
   * @param {Date} input
   * @return void
   */
  function handleSetDateIssued(input) {
    if (
      input &&
      (!dueDate || new Date(input).getTime() <= new Date(dueDate.getTime()))
    ) {
      setDateIssued(new Date(input));
      setDatesObject(new DatesObject(new Date(input), dueDate));
    }
  }

  /**
   * @param {Date} input
   * @return void
   */
  function handleSetDueDate(input) {
    if (
      input &&
      (!dateIssued ||
        new Date(input).getTime() >= new Date(dateIssued.getTime()))
    ) {
      setDueDate(new Date(input));
      setDatesObject(new DatesObject(dateIssued, new Date(input)));
    }
  }

  const subTotal = calculateSubTotal(productsList);
  const tax = subTotal * 0.1;
  const total = subTotal + tax;

  return (
    <>
      {/* ----- Input Date Issued, wrapped in Popover ----- */}
      <div className="containerDate andOtherInfo">
        <InputDateIssuedEnclosedInOnePopover
          dateIssued={dateIssued}
          dueDate={dueDate}
          handleSetDateIssued={handleSetDateIssued}
        />

        {/* ----- Display InvoiceID" ----- */}
        <div className="textDate">
          Invoice ID
          <br />
          {InvoiceIDObject.prefix + "-" + InvoiceIDObject.integer}
        </div>
      </div>

      <div className="containerDate andOtherInfo">
        {/* ----- Input Due Date, wrapped in Popover ------ */}
        <InputDueDateEnclosedInOnePopover
          dateIssued={dateIssued}
          dueDate={dueDate}
          handleSetDueDate={handleSetDueDate}
        />

        {/* ----- Display Amount Due" ----- */}
        <div
          className="textDate"
          style={{
            overflowWrap: "break-word",
          }}
        >
          Amount Due
          <br />
          {productsList && productsList.length > 0 && (
            <>
              <span>{currency}</span>
              <span> </span>
              <span>{formatNumber(total)}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}
