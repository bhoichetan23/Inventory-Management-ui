import "../../styles/productStyles.css";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (!totalPages) return null;

  // Single page
  if (totalPages === 1) {
    return (
      <div className="pagination pagination-single">
        <span>Page 1 of 1</span>
      </div>
    );
  }

  // Multiple pages
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
