import { useState, useEffect } from "react";
import { Popover } from "react-tiny-popover";
import ProductObject from "../../data/ProductObject";
import ProductIDObject from "../../data/ProductIDObject";

/** 
 * @param {ProductObject[]} productsList
 * @param {function} handleAddProductToProductsList
 * @param {boolean} productEntriesAreValid
 * @param {string} product
 * @param {string} unitOfMeasure
 * @param {number} quantity
 * @param {string} currency
 * @param {number} price
 * @return React Component
 */
export default function ButtonAddProductEnclosedInTwoPopovers({
  productsList,
  handleAddProductToProductsList,
  productEntriesAreValid,
  product,
  unitOfMeasure,
  quantity,
  currency,
  price,
}) {
  const [
    popupNotPossibleToAddProductToInvoice,
    setPopupNotPossibleToAddProductToInvoice,
  ] = useState(false);

  const [popupProductAddedToInvoice, setProductAddedToInvoice] =
    useState(false);

  useEffect(() => {
    if (popupNotPossibleToAddProductToInvoice) {
      const id = setTimeout(() => {
        setPopupNotPossibleToAddProductToInvoice(false);
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [popupNotPossibleToAddProductToInvoice]);

  useEffect(() => {
    if (popupProductAddedToInvoice) {
      const id = setTimeout(() => {
        setProductAddedToInvoice(false);
      }, 800);
      return () => clearTimeout(id);
    }
  }, [popupProductAddedToInvoice]);

  return (
    <Popover
      isOpen={popupProductAddedToInvoice}
      content={
        <div className="popup positive" style={{ marginLeft: "10px" }}>
          Product No {productsList.length} added!
        </div>
      }
    >
      <Popover
        isOpen={popupNotPossibleToAddProductToInvoice}
        content={
          <div className="popup negative" style={{ marginLeft: "100px" }}>
            Can not add product to invoice!
            <br />
            All product fields must have valid values!
          </div>
        }
      >
        <button
          className="button"
          type="submit"
          onClick={(e) => {
            setPopupNotPossibleToAddProductToInvoice(!productEntriesAreValid);
            setProductAddedToInvoice(productEntriesAreValid);
            handleAddProductToProductsList(
              productEntriesAreValid,
              new ProductObject(
                ++ProductIDObject.ID,
                product,
                unitOfMeasure,
                quantity,
                currency,
                price,
              ),
            );
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Add Product
        </button>
      </Popover>
    </Popover>
  );
}
