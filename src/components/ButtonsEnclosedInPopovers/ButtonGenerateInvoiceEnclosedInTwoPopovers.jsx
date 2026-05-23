import { Popover } from "react-tiny-popover";

/**
 * @param {number} allInvoiceFieldsHaveValue
 * @param {InvoiceIDObject} InvoiceIDObject
 * @param {boolean} popupNotPossibleToGenerateInvoice
 * @param {function} setPopupNotPossibleToGenerateInvoice
 * @param {boolean} popupInvoiceGenerated
 * @param {function} setPopupInvoiceGenerated
 * @return React Component
 */
export default function ButtonGenerateInvoiceEnclosedInTwoPopovers({
  allInvoiceFieldsHaveValue,
  InvoiceIDObject,
  popupNotPossibleToGenerateInvoice,
  setPopupNotPossibleToGenerateInvoice,
  popupInvoiceGenerated,
  setPopupInvoiceGenerated,
}) {
  return (
    <Popover
      isOpen={popupInvoiceGenerated}
      content={
        <div className="popup positive" style={{ marginLeft: "10px" }}>
          Invoice {InvoiceIDObject.prefix + "-" + InvoiceIDObject.integer}{" "}
          generated!
        </div>
      }
    >
      <Popover
        isOpen={popupNotPossibleToGenerateInvoice}
        content={
          <div className="popup negative" style={{ marginLeft: "320px" }}>
            Can not generate Invoice!
            <br />
            All invoice fields must have values!
          </div>
        }
      >
        <button
          className="button"
          onClick={() => {
            setPopupNotPossibleToGenerateInvoice(!allInvoiceFieldsHaveValue);
            setPopupInvoiceGenerated(allInvoiceFieldsHaveValue);
          }}
          style={{
            width: "420px",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          Generate Invoice
        </button>
      </Popover>
    </Popover>
  );
}
