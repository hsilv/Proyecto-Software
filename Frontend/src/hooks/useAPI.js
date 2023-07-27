import { useState } from "react";
import { useFetch } from "./useFetch";
import { serverHost } from "../config";

function useAPI() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { fetchRequest } = useFetch();

  const fetchAPI = async ({
    route,
    method = "GET",
    body,
    headers,
    signal,
    toJson = true,
    parseText = true,
    removeContentType = false,
    log = true,
  }) => {
    setLoading(true);
    if (log) console.log(`Fetching API to... ${route}`);
    try {
      const head3rs = {
        "Content-Type": "application/json",
        ...headers,
      };

      if (removeContentType) delete head3rs["Content-Type"];

      const reply = await fetchRequest({
        uri: `${serverHost}${route}`,
        method,
        body,
        headers: head3rs,
        signal,
      });

      let response;
      if (!parseText) response = reply;
      else if (toJson) response = await reply.json();
      else response = await reply.text();

      setResult(response ?? true);
    } catch (ex) {
      setError({
        status: ex?.status,
        message: ex?.statusMessage ?? ex?.statusText ?? "Ocurrió un error.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { result, error, loading, fetchAPI };
}

export { useAPI };
