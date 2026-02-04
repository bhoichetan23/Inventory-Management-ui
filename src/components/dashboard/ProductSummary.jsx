import supplierIcon from "../../assets/supplier.png";
import categoryIcon from "../../assets/category.png";
import "../../styles/dashboardStyles.css";

const ProductSummary = ({ data }) => {
  return (
    <div className="right-overview-card">
      <h3 className="right-overview-title">Product Summary</h3>

      <div className="right-grid-overview">
        <div className="right-overview-item">
          <img src={supplierIcon} alt="supplier" />
          <h4>21</h4>
          <p>Number of suppliers</p>
        </div>

        <div className="right-overview-item">
          <img src={categoryIcon} alt="category" />
          <h4>{data?.categories ?? 0}</h4>
          <p>Number of categories</p>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
