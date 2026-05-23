

/**
 * @param {ProductObject} productsList 
 * @return React Component
 */
export default function TableHeader({ productsList }) {
  return (
    <>
      {productsList && productsList.length > 0 && (
        <thead>
          <tr className="product header">
            <th style={{ width: "50px" }}>No</th>
            <th style={{ width: "200px", textAlign: "start" }}>Product</th>
            <th style={{ width: "150px" }}>Unit of Measure</th>
            <th style={{ width: "100px" }}>Quantity</th>
            <th style={{ width: "100px" }}>Currency</th>
            <th style={{ width: "100px" }}>Price</th>
            <th style={{ width: "100px" }}>Amount</th>
          </tr>
        </thead>
      )}
    </>
  );
}
