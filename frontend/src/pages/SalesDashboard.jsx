import React from "react";
import { useSalesData } from "../hooks/useSalesData";
import FilterPanel from "../components/FilterPanel";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const SalesDashboard = () => {
  const {
    data,
    loading,
    error,
    pagination,
    query,
    handleQueryChange,
    handlePageChange,
  } = useSalesData();

  return (
    <div className="dashboard-container">
      <h2>Retail Sales Analytics</h2>

      <div className="controls-section">
        <SearchBar
          search={query.search}
          onSearch={(value) => handleQueryChange("search", value)}
        />

        <FilterPanel query={query} onFilterChange={handleQueryChange} />
      </div>

      {/* Status Messages */}
      {loading && (
        <p className="status-message loading">Loading sales data...</p>
      )}
      {error && <p className="status-message error">Error: {error}</p>}

      {/* Data Display */}
      {!loading && !error && (
        <>
          <DataTable
            data={data}
            query={query}
            // Passes sort changes to the main handler
            onSortChange={(key, order) => {
              handleQueryChange("sortBy", key);
              handleQueryChange("sortOrder", order);
            }}
          />

          {/* Edge Case: No Search Results */}
          {data.length === 0 && pagination.totalItems === 0 && (
            <p className="status-message no-results">
              No sales records found matching your criteria.
            </p>
          )}

          {/* Pagination - only visible if there are results */}
          {pagination.totalItems > 0 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SalesDashboard;
