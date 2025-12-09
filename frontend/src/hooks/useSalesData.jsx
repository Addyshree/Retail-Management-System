import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "https://retail-management-system-4-th7k.onrender.com/";

export const useSalesData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0,
  });

  const [query, setQuery] = useState({
    search: "",
    sortBy: "transactionDate",
    sortOrder: "desc",
    gender: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...query,
      };

      const response = await axios.get(API_BASE_URL, { params });

      // console.log("data: ", response);

      setData(response.data.data);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.data.totalPages,
        totalItems: response.data.totalItems,
      }));
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
      setError("Failed to fetch data. Check API logs.");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, query]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  // Handler for Search, Filter, and Sort changes (resets page to 1)
  const handleQueryChange = (key, value) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Handler for Pagination changes (does not reset other queries)
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return {
    data,
    loading,
    error,
    pagination,
    query,
    handleQueryChange,
    handlePageChange,
  };
};
