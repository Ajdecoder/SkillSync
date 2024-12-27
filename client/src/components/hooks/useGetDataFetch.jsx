import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, { withCredentials: true });
      setData(response.data || {});
      setError(null);
    } catch (error) {
      console.error("API Error:", error.message);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading, fetchData };
};

export default useFetchData;

