const InventoryStats = ({ data }) => {
  return (
    <div className="inventory-stats">
      {/* Categories */}
      <div className="stat-card">
        <p className="stat-title">Categories</p>
        <h3>{data?.categories ?? 0}</h3>
        <p className="stat-sub">Total</p>
      </div>

      {/* Total Products */}
      <div className="stat-card">
        <p className="stat-title">Total Products</p>

        <div className="stat-pair">
          <div>
            <h3>{data?.productsLast7Days ?? 0}</h3>
            <p className="stat-sub">In last 7 days</p>
          </div>

          <div>
            <h3>₹{data?.revenueLast7Days ?? 0}</h3>
            <p className="stat-sub">Revenue</p>
          </div>
        </div>
      </div>

      {/* Top Selling */}
      <div className="stat-card">
        <p className="stat-title">Top Selling</p>

        <div className="stat-pair">
          <div>
            <h3>{data?.topSellingQty7Days ?? 0}</h3>
            <p className="stat-sub">In last 7 days</p>
          </div>

          <div>
            <h3>₹{data?.topSellingRevenue ?? 0}</h3>
            <p className="stat-sub">Revenue</p>
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div className="stat-card">
        <p className="stat-title">Stock Status</p>

        <div className="stat-pair">
          <div>
            <h3>{data?.lowStock ?? 0}</h3>
            <p className="stat-sub">Low Stock</p>
          </div>

          <div>
            <h3>{data?.outOfStock ?? 0}</h3>
            <p className="stat-sub">Out of Stock</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryStats;
