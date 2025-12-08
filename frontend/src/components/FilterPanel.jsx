import React from "react";

const CATEGORY_OPTIONS = [
  { value: "", label: "All Categories" },
  { value: "Electronics", label: "Electronics" },
  { value: "Apparel", label: "Apparel" },
  { value: "Home Goods", label: "Home Goods" },
  // Add more categories as per the dataset
];

const GENDER_OPTIONS = [
  { value: "", label: "All Genders" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const FilterPanel = ({ query, onFilterChange }) => {
  const handleInput = (e) => {
    // Pass filter name and value back to the hook handler
    onFilterChange(e.target.name, e.target.value);
  };

  return (
    <div className="filter-panel">
      <h4>Filter Options</h4>

      {/* Category Filter */}
      <select name="category" value={query.category} onChange={handleInput}>
        {CATEGORY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Gender Filter */}
      <select name="gender" value={query.gender} onChange={handleInput}>
        {GENDER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Price Range Filters */}
      <div className="price-filter-group">
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleInput}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
