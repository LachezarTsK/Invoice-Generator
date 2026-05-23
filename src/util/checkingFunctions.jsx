/**
 * prefix INV, length = 3
 * dash, i.e. '-' length = 1;
 * min invoice number of 1000, length = 4
 * Therefore, minLengthInvoiceID = 3 + 1 + 4 = 8
 */
const minLengthInvoiceID = 8;

/**
 *
 * @param {ProductObject[]} productsList
 * @param {BilledToObject} billedTo
 * @param {DatesObject} datesObject
 * @param {number} invoiceID
 * @return boolean
 */
export function notAllInvoiceFieldsHaveValue(
  productsList,
  billedTo,
  datesObject,
  invoiceID,
) {
  return (
    !productsList ||
    productsList.length === 0 ||
    !allBilledToEntriesAreValid(billedTo) ||
    !datesObject ||
    !datesObject.dateIssued ||
    !datesObject.dueDate ||
    !invoiceID ||
    invoiceID.length < minLengthInvoiceID
  );
}

/**
 * @param {string} companyName
 * @param {string} streetNumber
 * @param {string} streetName
 * @param {string} postalCode
 * @param {string} city
 * @param {string} state
 * @param {string} country
 * @return boolean
 */
export function allBilledToEntriesAreValid(billedTo) {
  return (
    billedTo &&
    billedTo.companyName &&
    billedTo.companyName.trim() &&
    billedTo.streetNumber &&
    billedTo.streetNumber.trim() &&
    billedTo.streetName &&
    billedTo.streetName.trim() &&
    billedTo.postalCode &&
    billedTo.postalCode.trim() &&
    billedTo.city &&
    billedTo.city.trim() &&
    billedTo.state &&
    billedTo.state.trim() &&
    billedTo.country &&
    billedTo.country.trim()
  );
}

/**
 * @param {string} productName
 * @param {string} unit
 * @param {number} quantity
 * @param {string} currency
 * @param {number} price
 * @return boolean
 */
export function allProductEntriesAreValid(
  productName,
  unit,
  quantity,
  currency,
  price,
) {
  return (
    productName &&
    productName.trim() &&
    unit &&
    unit != "Required, Select Unit" &&
    quantityIsValid(unit, quantity) &&
    currency &&
    currency != "Required, Select Currency" &&
    priceIsValid(price)
  );
}

/**
 * @param {string} unit
 * @param {number} quantity
 * @return boolean
 */
function quantityIsValid(unit, quantity) {
  if (
    !quantity ||
    isNaN(quantity) ||
    Number(quantity) <= 0 ||
    !isFinite(quantity)
  ) {
    return false;
  }
  if (unit === "liter" || unit === "kilogram" || unit === "meter") {
    return true;
  }

  if (unit === "piece" || unit === "services") {
    return Number.isInteger(Number(quantity));
  }
  return false;
}

/**
 * @param {number} price
 * @return boolean
 */
function priceIsValid(price) {
  if (
    !price ||
    price <= 0 ||
    isNaN(price) ||
    !isFinite(price) ||
    !hasMaxTwoDecimalPlaces(price)
  ) {
    return false;
  }

  return true;
}

/**
 * @param {number} value
 * @return boolean
 */
function hasMaxTwoDecimalPlaces(value) {
  return Number(value) === Number(Number(value).toFixed(2));
}
