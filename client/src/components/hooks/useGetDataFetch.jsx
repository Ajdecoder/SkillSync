import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (url) => {
  console.log('usel=====>',url)
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        withCredentials:true,
        headers:{
          Authorization: `Bearer ${localStorage.getItem("jwttoken")|| cookieStore.get("jwttoken")?.value || localStorage.getItem('googleUser')}`
        }
      });
      setData(response.data || {});
      setLoading(false)
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

