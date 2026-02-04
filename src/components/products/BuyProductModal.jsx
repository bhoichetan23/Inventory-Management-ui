import { useState } from "react";
import { buyProduct } from "../../api/productApi";
import { toast } from "react-hot-toast";

const BuyProductModal = ({ product, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    if (qty > product.quantity) {
      toast.error("Entered quantity exceeds available stock");
      return;
    }

    try {
      setLoading(true);
      await buyProduct({
        productId: product.productId,
        quantity: qty,
      });

      toast.success("Product purchased successfully");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container buy-modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="buy-content">
          <div className="buy-field product">{product.name}</div>

          <input
            className="buy-field"
            type="number"
            min="1"
            step="1"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || Number(val) >= 1) {
                setQuantity(val);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "ArrowDown") {
                e.preventDefault();
              }
            }}
          />

          <button
            className=" buy-submit"
            onClick={handleBuy}
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyProductModal;
