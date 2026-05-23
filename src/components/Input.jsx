import { useState, useEffect } from "react";
import {
  allProductEntriesAreValid,
  notAllInvoiceFieldsHaveValue,
} from "../util/checkingFunctions";

import BilledTo from "./BilledTo";
import DatesAmountDueInvoiceID from "./DatesAmountDueInvoiceID";
import ButtonAddProductEnclosedInTwoPopovers from "./ButtonsEnclosedInPopovers/ButtonAddProductEnclosedInTwoPopovers";
import ButtonGeneratePDFEnclosedInTwoPopovers from "./ButtonsEnclosedInPopovers/ButtonGeneratePDFEnclosedInTwoPopovers";
import ButtonGenerateInvoiceEnclosedInTwoPopovers from "./ButtonsEnclosedInPopovers/ButtonGenerateInvoiceEnclosedInTwoPopovers";
import ProductIDObject from "../data/ProductIDObject";
import InvoiceIDObject from "../data/InvoiceIDObject";

import "../styles/styles.css";
import "../styles/stylesDate.css";
import "../styles/stylesPopup.css";

/**
 * @param {ProductObject[]} productsList
 * @param {function} setProductsList
 * @param {function} handleAddProductToProductsList
 * @param {BilledToObject} billedTo
 * @param {function} handleSetBilledTo
 * @param {DatesObject} datesObject
 * @param {function} setDatesObject
 * @return React Component
 */
export default function Input({
  productsList,
  setProductsList,
  handleAddProductToProductsList,
  billedTo,
  handleSetBilledTo,
  datesObject,
  setDatesObject,
}) {
  const [product, setProduct] = useState("");
  const [unitOfMeasure, setUnitOfMeasure] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState("");

  const [
    popupNotPossibleToGenerateInvoice,
    setPopupNotPossibleToGenerateInvoice,
  ] = useState(false);

  const [popupInvoiceGenerated, setPopupInvoiceGenerated] = useState(false);

  useEffect(() => {
    if (popupNotPossibleToGenerateInvoice) {
      const id = setTimeout(() => {
        setPopupNotPossibleToGenerateInvoice(false);
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [popupNotPossibleToGenerateInvoice]);

  /**
   * To avoid complications with the synchronization of InvoiceIDObject,
   * which is used by several components, the useEffect for popupInvoiceGenerated
   * is deliberately left in Input component, instead of moving it to
   * ButtonGenerateInvoiceEnclosedInTwoPopovers.
   *
   * Since InvoiceIDObject is expected to last beyond an object within useState,
   * it is not created and updated within the scope of useState either.
   *
   * The other useEffect applied in  ButtonGenerateInvoiceEnclosedInTwoPopovers, namely this for
   * popupNotPossibleToGenerateInvoice, can be moved without complications to the component
   * ButtonGenerateInvoiceEnclosedInTwoPopovers. However, it is also left in the Input component
   * to keep in one place each useEffect applied in ButtonGenerateInvoiceEnclosedInTwoPopovers.
   */
  useEffect(() => {
    if (popupInvoiceGenerated) {
      const id = setTimeout(() => {
        setPopupInvoiceGenerated(false);
      }, 2000);
      ++InvoiceIDObject.integer;
      return () => clearTimeout(id);
    }
  }, [popupInvoiceGenerated]);

  const productEntriesAreValid = allProductEntriesAreValid(
    product,
    unitOfMeasure,
    quantity,
    currency,
    price,
  );

  const allInvoiceFieldsHaveValue = !notAllInvoiceFieldsHaveValue(
    productsList,
    billedTo,
    datesObject,
    InvoiceIDObject.prefix + "-" + InvoiceIDObject.integer,
  );

  function resetEntryProduct() {
    setProduct("");
    setUnitOfMeasure("");
    setQuantity("");
    setCurrency("");
    setPrice("");
  }

  function resetProductList() {
    setProductsList(new Array());
    ProductIDObject.ID = 0;
  }

  return (
    <>
      {/* ----- DatesAmountDueInvoiceID, input and display -----*/}
      <DatesAmountDueInvoiceID
        setDatesObject={setDatesObject}
        currency={currency}
        productsList={productsList}
        InvoiceIDObject={InvoiceIDObject}
      />

      <div className="invoice">
        {/* ----- Billed To, input -----*/}
        <BilledTo handleSetBilledTo={handleSetBilledTo} />

        <div className="container">
          {/* ----- Button "Generate Invoice", wrapped in two Popovers -----*/}
          <ButtonGenerateInvoiceEnclosedInTwoPopovers
            allInvoiceFieldsHaveValue={allInvoiceFieldsHaveValue}
            InvoiceIDObject={InvoiceIDObject}
            popupNotPossibleToGenerateInvoice={
              popupNotPossibleToGenerateInvoice
            }
            setPopupNotPossibleToGenerateInvoice={
              setPopupNotPossibleToGenerateInvoice
            }
            popupInvoiceGenerated={popupInvoiceGenerated}
            setPopupInvoiceGenerated={setPopupInvoiceGenerated}
          />
          <div className="text topLabel">Purchase Details</div>

          {/* ----- Input Product Name -----*/}
          <div className="containerInput">
            <input
              id="Product"
              name="Product"
              className="input"
              type="text"
              placeholder="Required"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            ></input>
            <label htmlFor="Product" className="text">
              Product Name
            </label>
          </div>

          {/* ----- Input Unit Of Measure -----*/}
          <div className="containerInput">
            <select
              id="UnitOfMeasure"
              name="UnitOfMeasure"
              className="select"
              type="text"
              value={unitOfMeasure}
              onChange={(e) => setUnitOfMeasure(e.target.value)}
            >
              <option>Required, Select Unit</option>
              <option>piece</option>
              <option>kilogram</option>
              <option>liter</option>
              <option>meter</option>
              <option>services</option>
            </select>
            <label htmlFor="UnitOfMeasure" className="text">
              Unit Of Measure
            </label>
          </div>

          {/* ----- Input Quantity -----*/}
          <div className="containerInput">
            <input
              id="Quantity"
              name="Quantity"
              className="input"
              type="number"
              placeholder="Required, for piece or services, only integers"
              min={unitOfMeasure === "piece" ? 1 : 0.01}
              step={unitOfMeasure === "piece" ? 1 : 0.01}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
            <label htmlFor="Quantity" className="text">
              Quantity
            </label>
          </div>

          {/* ----- Input Currency -----*/}
          <div className="containerInput">
            <select
              id="Currency"
              name="Currency"
              className="select"
              type="text"
              placeholder="Required"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option>Required, Select Currency</option>
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>CAD</option>
            </select>
            <label htmlFor="Currency" className="text">
              Currency
            </label>
          </div>

          {/* ----- Input Price -----*/}
          <div className="containerInput">
            <input
              id="Price"
              name="Price"
              className="input"
              type="number"
              placeholder="Required, max two decimal places"
              min={0.01}
              step={0.01}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
            <label htmlFor="Price" className="text">
              Price
            </label>
          </div>

          <div>
            {/* ----- Button "Add Product", wrapped in two Popovers -----*/}
            <ButtonAddProductEnclosedInTwoPopovers
              productsList={productsList}
              handleAddProductToProductsList={handleAddProductToProductsList}
              productEntriesAreValid={productEntriesAreValid}
              product={product}
              unitOfMeasure={unitOfMeasure}
              quantity={quantity}
              currency={currency}
              price={price}
            />

            {/* ----- Button "Reset Product Entry" ----- */}
            <button
              className="button"
              type="reset"
              onClick={(e) => {
                resetEntryProduct();
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              Reset Product Entry
            </button>

            {/* ----- Button "Reset Product List" -----*/}
            <button
              className="button"
              onClick={(e) => {
                resetProductList();
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              Reset Product List
            </button>

            {/* ----- Button "Generate PDF", wrapped in two Popovers -----*/}
            <ButtonGeneratePDFEnclosedInTwoPopovers
              allInvoiceFieldsHaveValue={allInvoiceFieldsHaveValue}
              productsList={productsList}
              billedTo={billedTo}
              datesObject={datesObject}
            />
          </div>
        </div>
      </div>
    </>
  );
}
