import closeIcon from "../../assets/close.png";
import downloadIcon from "../../assets/download.png";
import printIcon from "../../assets/print.png";

import { downloadInvoice } from "../../api/invoiceapi";

const InvoiceViewModal = ({ invoice, onClose }) => {
  const invoiceDate = new Date(invoice.createdAt);
  const dueDate = new Date(invoice.dueDate);

  const subTotal = invoice.amount;
  const tax = Math.round(subTotal * 0.1);
  const totalDue = subTotal + tax;

  const handlePrint = () => window.print();

  return (
    <div className="modal-overlay">
      <div className="modal-container invoice-modal">
        {/* ACTION ICONS */}
        <div className="invoice-modal-actions">
          <button
            className="invoice-modal-btn invoice-btn-close"
            onClick={onClose}
          >
            <img src={closeIcon} alt="Close" />
          </button>

          <button
            className="invoice-modal-btn invoice-btn-download"
            onClick={() => downloadInvoice(invoice._id)}
          >
            <img src={downloadIcon} alt="Download" />
          </button>

          <button
            className="invoice-modal-btn invoice-btn-print"
            onClick={handlePrint}
          >
            <img src={printIcon} alt="Print" />
          </button>
        </div>

        {/* TITLE */}
        <h2 className="invoice-title">Invoice</h2>
        <hr className="invoice-divider" />

        {/* HEADER */}
        <div className="invoice-header-grid">
          <div>
            <p className="invoice-label">Billed To</p>
            <p className="invoice-bold">Customer Name</p>
            <p>Customer Address</p>
            <p>City, Country - 0000</p>
          </div>

          <div>
            <p className="invoice-bold">Inventory System Pvt Ltd</p>
            <p>Business Address</p>
            <p>City, State - 0000</p>
            <p>Tax ID: XXXXX000</p>
          </div>
        </div>

        <hr className="invoice-divider" />

        {/* BODY */}
        <div className="invoice-body">
          {/* LEFT META */}
          <div className="invoice-left">
            <div className="invoice-meta-block">
              <p className="invoice-meta-label">Invoice #</p>
              <p className="invoice-meta-value">{invoice.invoiceId}</p>
            </div>

            <div className="invoice-meta-block">
              <p className="invoice-meta-label">Invoice Date</p>
              <p className="invoice-meta-value">{invoiceDate.toDateString()}</p>
            </div>

            <div className="invoice-meta-block">
              <p className="invoice-meta-label">Reference</p>
              <p className="invoice-meta-value">{invoice._id}</p>
            </div>

            <div className="invoice-meta-block">
              <p className="invoice-meta-label">Due Date</p>
              <p className="invoice-meta-value">{dueDate.toDateString()}</p>
            </div>
          </div>

          {/* RIGHT SIDE – DRAWN TABLE */}
          <div className="invoice-right">
            <div className="invoice-grid">
              {/* HEADER */}
              <div className="invoice-row invoice-header-row">
                <span className="col-product">Product</span>
                <span className="col-qty">Qty</span>
                <span className="col-price">Price</span>
                <span className="col-amount">Amount</span>
              </div>

              {/* ITEM ROW */}
              <div className="invoice-row">
                <span className="col-product">{invoice.product?.name}</span>
                <span className="col-qty">{invoice.quantity}</span>
                <span className="col-price">₹{invoice.price}</span>
                <span className="col-amount">₹{invoice.amount}</span>
              </div>

              {/* DIVIDER */}
              <div className="invoice-row-divider" />

              {/* SUBTOTAL */}
              <div className="invoice-row invoice-summary-row">
                <span className="col-product">Subtotal</span>
                <span className="col-qty"></span>
                <span className="col-price"></span>
                <span className="col-amount">₹{subTotal}</span>
              </div>

              {/* TAX */}
              <div className="invoice-row invoice-summary-row">
                <span className="col-product">Tax (10%)</span>
                <span className="col-qty"></span>
                <span className="col-price"></span>
                <span className="col-amount">₹{tax}</span>
              </div>

              {/* FINAL DIVIDER */}
              <div className="invoice-row-divider strong" />

              {/* TOTAL */}
              <div className="invoice-row invoice-total-row">
                <span className="col-product">Total Due</span>
                <span className="col-qty"></span>
                <span className="col-price"></span>
                <span className="col-amount">₹{totalDue}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="invoice-note">
          Please pay within 7 days of receiving this invoice.
        </p>

        <hr className="invoice-divider" />

        {/* FOOTER CONTACT */}
        <div className="invoice-footer-bottom">
          <span>www.inventory.com</span>
          <span>45875844</span>
          <span>support@inventory.com</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceViewModal;
