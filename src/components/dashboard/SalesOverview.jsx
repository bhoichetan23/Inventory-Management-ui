import saleIcon from "../../assets/sale.png";
import revenueIcon from "../../assets/revenue.png";
import profitIcon from "../../assets/profit.png";
import costIcon from "../../assets/cost.png";
import "../../styles/dashboardStyles.css";

const SalesOverview = ({ data }) => {
  return (
    <div className="overview-card">
      <h3 className="overview-title">Sales Overview</h3>

      <div className="overview-grid">
        <div className="overview-item">
          <img src={saleIcon} alt="sales" />
          <h4>{data?.count ?? 0}</h4>
          <p>Sales</p>
        </div>
        <div className="overview-item">
          <img src={revenueIcon} alt="revenue" />
          <h4>₹{data?.revenue ?? 0}</h4>
          <p>Revenue</p>
        </div>
        <div className="overview-item">
          <img src={profitIcon} alt="profit" />
          <h4>₹12345</h4>
          <p>Profit</p>
        </div>
        <div className="overview-item">
          <img src={costIcon} alt="cost" />
          <h4>₹6574</h4>
          <p>Cost</p>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;
