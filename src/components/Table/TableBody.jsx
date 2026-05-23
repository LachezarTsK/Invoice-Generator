import { formatNumber } from "../../util/formattingFunctions";

/**
 * @param {ProductObject[]} productsList
 * @param {function} handleRemoveProductFromProductsList
 * @return React Component
 */
export default function TableBody({
  productsList,
  handleRemoveProductFromProductsList,
}) {
  return (
    <tbody>
      {productsList.map(
        ({ id, name, unitOfMeasure, quantity, currency, price }, index) => (
          <tr key={id} className="product">
            
            {/* ----- Product No in the table, not to be confused with ProductID -----*/}
            <th scope="row" style={{ width: "50px" }}>
              {index + 1}
            </th>

            {/* ----- Product Name -----*/}
            <td style={{ width: "200px", textAlign: "start" }}>{name}</td>

            {/* ----- Unit of Measure -----*/}
            <td style={{ width: "150px" }}>{unitOfMeasure}</td>

            {/* ----- Quantity -----*/}
            <td style={{ width: "100px", textAlign: "end" }}>
              {formatNumber(quantity)}
            </td>

            {/* ----- Unit Price -----*/}
            <td style={{ width: "100px", textAlign: "end" }}>{currency}</td>
            <td style={{ width: "100px", textAlign: "end" }}>
              {formatNumber(price)}
            </td>

            {/* ----- Price for chosen quantity -----*/}
            <td style={{ width: "100px", textAlign: "end" }}>
              {formatNumber(quantity * price)}
            </td>

            {/* ----- Button to delete a product from the invoice (product list) -----*/}
            <td style={{ width: "100px" }}>
              <button
                className="button"
                onClick={(e) => {
                  handleRemoveProductFromProductsList(id);
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ),
      )}
    </tbody>
  );
}
