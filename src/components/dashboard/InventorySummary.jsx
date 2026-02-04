import stockIcon from "../../assets/instock.png";
import receiveIcon from "../../assets/toreceive.png";
import "../../styles/dashboardStyles.css";

const InventorySummary = ({ data }) => {
  return (
    <div className="right-overview-card">
      <h3 className="right-overview-title">Inventory Summary</h3>

      <div className="right-grid-overview">
        <div className="right-overview-item">
          <img src={stockIcon} alt="stock" />
          <h4>{data?.inStock ?? 0}</h4>
          <p>In Stock</p>
        </div>

        <div className="right-overview-item">
          <img src={receiveIcon} alt="receive" />
          <h4>0</h4>
          <p>To be Received</p>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;
