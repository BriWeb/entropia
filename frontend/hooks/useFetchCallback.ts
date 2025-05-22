import { useState, useCallback } from "react";

interface UseFetchParams {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: unknown;
}

export function useFetchCallback<T = unknown>() {
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<unknown>(null);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const fetchNow = useCallback(
    async ({
      url,
      method = "GET",
      headers = {},
      body = null,
    }: UseFetchParams) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        });
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.mensaje);
        }
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, data, error, fetchNow };
}
