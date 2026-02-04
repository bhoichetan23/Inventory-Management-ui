import { useState, useEffect, useRef } from "react";
import { markInvoicePaid, deleteInvoice } from "../../api/invoiceapi";
import InvoiceViewModal from "./InvoiceViewModal.jsx";
import Pagination from "../products/Pagination.jsx";

const InvoiceTable = ({
  invoices,
  setInvoices,
  loading,
  page,
  totalPages,
  onPageChange,
  onRefresh,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [viewInvoice, setViewInvoice] = useState(null);

  const handleMarkPaid = async (id) => {
    await markInvoicePaid(id);

    setInvoices((prev) =>
      prev.map((inv) => (inv._id === id ? { ...inv, status: "Paid" } : inv)),
    );
    onRefresh();
    setOpenMenuId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this invoice?")) return;

    await deleteInvoice(id);

    setInvoices((prev) => prev.filter((inv) => inv._id !== id));
    onRefresh();
    setOpenMenuId(null);
  };

  const actionMenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openMenuId &&
        actionMenuRef.current &&
        !actionMenuRef.current.contains(e.target)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  if (loading) {
    return <div className="table-loading">Loading invoices...</div>;
  }

  if (!invoices.length) {
    return <div className="table-empty">No invoices found</div>;
  }

  return (
    <>
      <div className="invoice-table-wrapper">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Reference ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Due Date </th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => {
              const dueDate = new Date(inv.dueDate);

              return (
                <tr key={inv._id}>
                  <td>{inv.invoiceId}</td>
                  <td>{inv._id}</td>
                  <td>₹{inv.amount}</td>
                  <td>
                    <span
                      className={`invoice-status ${
                        inv.status === "Paid" ? "paid" : "unpaid"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>

                  <td className="invoice-due-action-cell">
                    <span className="invoice-due-date">
                      {dueDate.toDateString()}
                    </span>

                    <div className="invoice-action-cell">
                      <button
                        className="invoice-action-trigger"
                        onClick={() =>
                          setOpenMenuId(openMenuId === inv._id ? null : inv._id)
                        }
                      >
                        ⋮
                      </button>

                      {openMenuId === inv._id && (
                        <div
                          className="invoice-action-menu"
                          ref={actionMenuRef}
                        >
                          {inv.status === "Unpaid" ? (
                            <button
                              className="danger"
                              onClick={() => handleMarkPaid(inv._id)}
                            >
                              Mark as Paid
                            </button>
                          ) : (
                            <>
                              <button onClick={() => setViewInvoice(inv)}>
                                View Invoice
                              </button>
                              <button
                                className="danger"
                                onClick={() => handleDelete(inv._id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      {viewInvoice && (
        <InvoiceViewModal
          invoice={viewInvoice}
          onClose={() => setViewInvoice(null)}
        />
      )}
    </>
  );
};

export default InvoiceTable;
