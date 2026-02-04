import { useState } from "react";
import UploadCSVModal from "./UploadCSVModal";
import { createPortal } from "react-dom";

const AddProductModal = ({ onClose, onSelectSingle, onSuccess }) => {
  const [mode, setMode] = useState(null); // null | "csv"

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Add Product</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* OPTION SCREEN */}
        {mode === null && (
          <div className="modal-options">
            <div
              className="option-card"
              onClick={() => {
                onSelectSingle(); // tell Products page
                onClose(); // close modal
              }}
            >
              <h4>Individual Product</h4>
              <p>Add a single product manually</p>
            </div>

            <div className="option-card" onClick={() => setMode("csv")}>
              <h4>Multiple Products (CSV)</h4>
              <p>Upload products in bulk using CSV</p>
            </div>
          </div>
        )}

        {/* CSV MODAL CONTENT (STAYS MODAL) */}
        {mode === "csv" && (
          <UploadCSVModal
            onCancel={() => setMode(null)}
            onSuccess={() => {
              onSuccess();
              setMode(null);
              onClose();
            }}
          />
        )}
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default AddProductModal;
