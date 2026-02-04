import "../../styles/dashboardStyles.css";

const TopProducts = ({ data = [], loading = false }) => {
  if (loading) {
    return (
      <div className="right-overview-card ">
        <h3 className="right-overview-title">Top Products</h3>
        <p className="table-loading">Loading top products...</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="right-overview-card top-products">
        <h3 className="right-overview-title">Top Products</h3>
        <p className="table-empty">No top products yet.</p>
      </div>
    );
  }

  return (
    <div className="right-overview-card top-products">
      <h3 className="right-overview-title">Top Products</h3>

      <ul className="top-products-list">
        {data.map((p, i) => (
          <li key={i}>
            <div className="product-left">
              <img src={p.image || null} alt="" />
              <span>{p.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;
