import { calculateSubTotal } from "../../util/generalPurposeFunctions";
import { formatNumber } from "../../util/formattingFunctions";

/**
 * @param {ProductObject[]} productsList
 * @return React Component
 */
export default function TableFooter({ productsList }) {
  const subTotal = calculateSubTotal(productsList);
  const tax = subTotal * 0.1;
  const total = subTotal + tax;

  return (
    <tfoot>
      {/* ----- Subtotal: total price for all products, in the chosen quantities, without Tax ----- */}
      {productsList && productsList.length > 0 && (
        <tr className="product footer">
          <td>Subtotal </td>
          <td
            style={{
              width: "200px",
              textAlign: "end",
              overflowWrap: "break-word",
            }}
          >
            {formatNumber(subTotal)}
          </td>
        </tr>
      )}

      {/* ----- Amount due for Tax ----- */}
      {productsList && productsList.length > 0 && (
        <tr className="product footer">
          <td>Tax 10%</td>
          <td
            style={{
              width: "200px",
              textAlign: "end",
              overflowWrap: "break-word",
            }}
          >
            {formatNumber(tax)}
          </td>
        </tr>
      )}

      {/* ----- Total Price, including tax ----- */}
      {productsList && productsList.length > 0 && (
        <tr className="product footer">
          <td>Total</td>
          <td
            style={{
              width: "200px",
              textAlign: "end",
              overflowWrap: "break-word",
            }}
          >
            {formatNumber(total)}
          </td>
        </tr>
      )}
    </tfoot>
  );
}
