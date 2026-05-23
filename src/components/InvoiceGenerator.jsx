import { useState } from "react";

import Input from "./Input";
import TableBody from "./Table/TableBody";
import TableHeader from "./Table/TableHeader";
import TableFooter from "./Table/TableFooter";
import DatesObject from "../data/DatesObject";
import BilledToObject from "../data/BilledToObject";

import "../styles/styles.css";

const NOT_FOUND = -1;

/**
 * @return React Component
 */
export default function InvoiceGenerator() {
  const [productsList, setProductsList] = useState(new Array());
  const [billedTo, setBilledTo] = useState(new BilledToObject());
  const [datesObject, setDatesObject] = useState(new DatesObject());

  /**
   * @param {boolean} productEntriesAreValid
   * @param {ProductObject} product
   * @return void
   */
  function handleAddProductToProductsList(productEntriesAreValid, product) {
    if (!productEntriesAreValid) {
      return;
    }
    const clone = [...productsList];
    clone.push(product);
    setProductsList(clone);
  }

  /**
   *
   * @param {number} id
   * @return void
   */
  function handleRemoveProductFromProductsList(id) {
    let index = NOT_FOUND;
    for (let i = 0; i < productsList.length; ++i) {
      if (id === productsList[i].id) {
        index = i;
        break;
      }
    }
    if (index === NOT_FOUND) {
      return;
    }
    setProductsList([
      ...productsList.slice(0, index),
      ...productsList.slice(index + 1),
    ]);
  }

  /**
   * @param {string} type
   * @param {string} input
   * @return void
   */
  function handleSetBilledTo(type, input) {
    switch (type) {
      case "companyName":
        setBilledTo({ ...billedTo, companyName: input });
        break;
      case "streetNumber":
        setBilledTo({ ...billedTo, streetNumber: input });
        break;
      case "streetName":
        setBilledTo({ ...billedTo, streetName: input });
        break;
      case "postalCode":
        setBilledTo({ ...billedTo, postalCode: input });
        break;
      case "city":
        setBilledTo({ ...billedTo, city: input });
        break;
      case "state":
        setBilledTo({ ...billedTo, state: input });
        break;
      case "country":
        setBilledTo({ ...billedTo, country: input });
        break;
      default:
        setBilledTo(new BilledToObject());
    }
  }

  return (
    <>
      <div className="container">
        {/* ----- Input Fields For Product */}
        <Input
          productsList={productsList}
          setProductsList={setProductsList}
          handleAddProductToProductsList={handleAddProductToProductsList}
          billedTo={billedTo}
          handleSetBilledTo={handleSetBilledTo}
          datesObject={datesObject}
          setDatesObject={setDatesObject}
        />

        {/* ----- Table with Products added to the invoice */}
        <table className="container">
          <TableHeader productsList={productsList} />
          <TableBody
            productsList={productsList}
            handleRemoveProductFromProductsList={
              handleRemoveProductFromProductsList
            }
          />
          <TableFooter productsList={productsList} />
        </table>
      </div>
    </>
  );
}
