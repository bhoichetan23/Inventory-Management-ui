import Pagination from "./Pagination";

const ProductTable = ({
  products,
  loading,
  page,
  totalPages,
  onPageChange,
  onBuy,
}) => {
  if (loading) {
    return <p className="table-loading">Loading products...</p>;
  }

  if (!products.length) {
    return <p className="table-empty">No products found.</p>;
  }

  return (
    <div className="product-table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Threshold</th>
            <th scope="col">Expiry Date</th>
            <th scope="col">Availability</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="product-name-cell">
                <div className="product-info">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <span>{product.name}</span>
                </div>
              </td>

              <td>₹{product.price}</td>

              <td>
                {product.quantity} {product.unit}
              </td>

              <td>{product.threshold}</td>

              <td>
                {product.expiryDate
                  ? new Date(product.expiryDate).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <span
                  className={`status-badge ${getStatusClass(product.status)}`}
                >
                  {product.status}
                </span>
              </td>

              <td>
                <button
                  className="buy-btn"
                  disabled={loading || product.status === "Out of Stock"}
                  onClick={() => onBuy && onBuy(product)}
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

const getStatusClass = (status) => {
  if (status === "In Stock") return "in-stock";
  if (status === "Low Stock") return "low-stock";
  return "out-of-stock";
};

export default ProductTable;
