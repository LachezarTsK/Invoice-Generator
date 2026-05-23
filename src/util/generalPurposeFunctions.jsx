/**
 * @param {ProductObject[]} productsList
 * @return number
 */
export function calculateSubTotal(productsList) {
  let subTotal = 0;
  for (let current of productsList) {
    subTotal += current.price * current.quantity;
  }
  return subTotal;
}
