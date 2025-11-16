import { useEffect, useState } from "react";

export default function useFetch(url, options = {}, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData?.message || `Error: ${response.statusText}`);
        }

        if (!ignore) {
          setData(responseData);
          setError(null);
        }
      } catch (err) {
        if (!ignore) setError(err.message || "Something went wrong");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, dependencies);

  return { data, loading, error };
}
