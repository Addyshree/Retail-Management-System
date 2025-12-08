import React from "react";

const DataTable = ({ data, query, onSortChange }) => {
  const handleSort = (key) => {
    // Toggle sort order: If same column, switch order; otherwise, default to 'asc'
    let newSortOrder = "asc";
    if (query.sortBy === key) {
      newSortOrder = query.sortOrder === "asc" ? "desc" : "asc";
    }
    onSortChange(key, newSortOrder);
  };

  const getSortIndicator = (key) => {
    if (query.sortBy !== key) return "";
    return query.sortOrder === "asc" ? " ▲" : " ▼";
  };

  const columns = [
    { key: "transactionID", label: "Tx ID" },
    { key: "customerName", label: "Customer" },
    { key: "productName", label: "Product" },
    { key: "productCategory", label: "Category" },
    { key: "pricePerUnit", label: "Price" },
    { key: "quantity", label: "Qty" },
    { key: "discountPercent", label: "Discount (%)" },
    { key: "transactionDate", label: "Date" },
  ];

  return (
    <div className="data-table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={query.sortBy === col.key ? "active-sort" : ""}
              >
                {col.label}
                <span>{getSortIndicator(col.key)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((sale) => (
            <tr key={sale.transactionID}>
              {/* {String(sale.transactionID).substring(0, 6)} */}
              <td> {String(sale.transactionID).substring(0, 8)}...</td>
              <td>{sale.customerName}</td>
              <td>{sale.productName}</td>
              <td>{sale.productCategory}</td>
              <td>${sale.pricePerUnit.toFixed(2)}</td>
              <td>{sale.quantity}</td>
              <td>{sale.discountPercent}%</td>
              <td>{new Date(sale.transactionDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
