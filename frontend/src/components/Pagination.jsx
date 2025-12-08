import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Determine which page numbers to show (e.g., current, prev, next)
  const renderPageNumbers = () => {
    const pages = [];
    // Maximum number of page buttons to show (e.g., 5 buttons)
    const maxPageButtons = 5;
    let startPage, endPage;

    if (totalPages <= maxPageButtons) {
      // If total pages are less than max buttons, show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate starting and ending page numbers to center around the current page
      const offset = Math.floor(maxPageButtons / 2);
      startPage = Math.max(1, currentPage - offset);
      endPage = Math.min(totalPages, currentPage + offset);

      // Adjust start/end to ensure maxPageButtons are displayed if possible
      if (endPage - startPage + 1 < maxPageButtons) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, maxPageButtons);
        } else if (endPage === totalPages) {
          startPage = Math.max(1, totalPages - maxPageButtons + 1);
        }
      }
    }

    // Add ellipsis if necessary
    if (startPage > 1) {
      pages.push(<span key="start-ellipsis">...</span>);
    }

    // Generate the actual page buttons
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pages.push(<span key="end-ellipsis">...</span>);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-controls">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
