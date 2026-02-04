import { useState } from "react";
import { markInvoicePaid, deleteInvoice } from "../../api/invoiceapi.js";
import InvoiceViewModal from "./InvoiceViewModal.jsx";

const InvoiceActions = ({ invoice, refresh }) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const handleMarkPaid = async () => {
    await markInvoicePaid(invoice._id);
    setOpen(false);
    refresh();
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this invoice?")) return;
    await deleteInvoice(invoice._id);
    setOpen(false);
    refresh();
  };

  return (
    <>
      <button onClick={() => setOpen(!open)}>⋮</button>

      {open && (
        <div className="action-dropdown">
          {invoice.status === "Unpaid" ? (
            <button className="danger-btn" onClick={handleMarkPaid}>
              Unpaid
            </button>
          ) : (
            <>
              <button onClick={() => setView(true)}>View Invoice</button>
              <button className="danger-btn" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      )}

      {view && (
        <InvoiceViewModal invoice={invoice} onClose={() => setView(false)} />
      )}
    </>
  );
};

export default InvoiceActions;
