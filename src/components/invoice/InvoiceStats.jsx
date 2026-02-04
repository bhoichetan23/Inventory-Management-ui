const InvoiceStats = ({ stats = {} }) => {
  return (
    <div className="invoice-stats">
      {/* Recent Transactions */}
      <div className="stat-card">
        <p className="stat-title">Recent Transactions</p>
        <h3>{stats.recentTransactions ?? 0}</h3>
        <p className="stat-sub">Last 7 days</p>
      </div>

      {/* Total Invoice */}
      <div className="stat-card">
        <p className="stat-title">Total Invoice</p>

        <div className="stat-pair">
          <div>
            <h3>{stats.totalInvoices ?? 0}</h3>
            <p className="stat-sub">Total till date</p>
          </div>

          <div>
            <h3>{stats.processedInvoices ?? 0}</h3>
            <p className="stat-sub">Processed</p>
          </div>
        </div>
      </div>

      {/* Paid Amount */}
      <div className="stat-card">
        <p className="stat-title">Paid Amount</p>
        <h3>₹{stats.paidLast7DaysAmount ?? 0}</h3>
        <p className="stat-sub">Last 7 days</p>
      </div>

      {/* Unpaid Amount */}
      <div className="stat-card">
        <p className="stat-title">Unpaid Amount</p>
        <h3>₹{stats.unpaidAmount ?? 0}</h3>
        <p className="stat-sub">Total Pending</p>
      </div>
    </div>
  );
};

export default InvoiceStats;
