import { useEffect, useState, useRef } from "react";
import { API } from "@/services/api";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const lastFetchedUrl = useRef(null);

  useEffect(() => {
    if (!url) return;

    // Skip if we already fetched this exact URL
    if (lastFetchedUrl.current === url && data !== null) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await API.get(url, {
          withCredentials: true,
          signal: controller.signal,
        });
        lastFetchedUrl.current = url;
        setData(response.data || {});
        setError(false);
      } catch (error) {
        if (error.name === "CanceledError" || error.name === "AbortError") return;
        console.error("API Error:", error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, error, loading, setError };
};

export default useFetchData;
