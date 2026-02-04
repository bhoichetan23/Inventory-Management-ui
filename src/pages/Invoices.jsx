import { useEffect, useState, useCallback } from "react";
import { getInvoices, getInvoiceStats } from "../api/invoiceapi";
import "../styles/invoicestyles.css";

import InvoiceStats from "../components/invoice/InvoiceStats.jsx";
import InvoiceTable from "../components/invoice/InvoiceTable.jsx";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [invoiceStats, setInvoiceStats] = useState(null);

  // Load invoice stats
  const loadStats = useCallback(async () => {
    try {
      const data = await getInvoiceStats();
      setInvoiceStats(data);
    } catch (err) {
      console.error("Failed to load invoice stats", err);
    }
  }, []);

  const loadInvoices = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getInvoices({
        page,
        limit: 10,
        search: debouncedSearch,
      });

      setInvoices(res.invoices);
      setTotalPages(res.totalPages);

      loadStats();
    } catch (err) {
      console.error("Failed to load invoices", err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, loadStats]);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // Debounce Search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 1000);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div className="invoice-container">
      <div className="invoice-top-bar">
        <h4>Invoices</h4>

        <input
          className="invoice-search"
          placeholder="Search invoice..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <hr />

      {/* LIST VIEW  */}
      <>
        {/* STATS */}
        <div className="card">
          <h3 className="card-title">Overall Invoices</h3>
          {invoiceStats ? (
            <InvoiceStats stats={invoiceStats} />
          ) : (
            <div className="table-loading">Loading stats...</div>
          )}
        </div>

        {/* TABLE */}
        <div className="card">
          <div className="invoice-table-header">
            <h3>Invoices</h3>
          </div>

          <InvoiceTable
            invoices={invoices}
            setInvoices={setInvoices}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onRefresh={loadInvoices}
          />
        </div>
      </>
    </div>
  );
};

export default Invoices;
