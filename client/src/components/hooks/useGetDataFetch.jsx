import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      console.log("url",url)
      setData(response.data || {});
      setError(false);
    } catch (error) {
      console.error("API Error:", error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, error, loading , setError };
};

export default useFetchData;

