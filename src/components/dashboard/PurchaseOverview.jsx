import purchaseIcon from "../../assets/purchase.png";
import costIcon from "../../assets/cost2.png";
import cancelIcon from "../../assets/cancel.png";
import returnIcon from "../../assets/return.png";

import "../../styles/dashboardStyles.css";

const PurchaseOverview = ({ data }) => {
  return (
    <div className="overview-card">
      <h3 className="overview-title">Purchase Overview</h3>

      <div className="overview-grid">
        <div className="overview-item">
          <img src={purchaseIcon} alt="purchase" />
          <h4>{data?.count ?? 0}</h4>
          <p>Purchase</p>
        </div>
        <div className="overview-item">
          <img src={costIcon} alt="cost" />
          <h4>₹{data?.cost ?? 0}</h4>
          <p>Cost</p>
        </div>
        <div className="overview-item">
          <img src={cancelIcon} alt="cancel" />
          <h4>0</h4>
          <p>Cancel</p>
        </div>
        <div className="overview-item">
          <img src={returnIcon} alt="return" />
          <h4>0</h4>
          <p>Return</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOverview;
