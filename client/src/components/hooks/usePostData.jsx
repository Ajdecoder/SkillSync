import React, { useEffect, useState } from "react";
import axios from "axios";

const usePostData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(url, { withCredentials: true });
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
    postData();
  }, [url]);

  return { data, error, loading, postData };
};

export default usePostData;

