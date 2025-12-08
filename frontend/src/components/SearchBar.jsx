import React, { useState, useEffect } from "react";

const SearchBar = ({ search, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(search);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim() !== search) {
        onSearch(searchTerm.trim());
      }
    }, 500); // Wait 500ms after last input before firing search

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, search, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by Customer, Product, or Brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
