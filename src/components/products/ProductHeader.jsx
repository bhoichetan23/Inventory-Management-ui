const ProductHeader = ({ search, onSearch, onAddProduct }) => {
  return (
    <div className="product-header">
      <div className="product-header-left">
        <h3>Product List</h3>
      </div>

      <div className="product-header-right">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />

        <button className="primary-btn" onClick={onAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductHeader;
