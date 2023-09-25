import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";

/**
 *
 */

function useCountries() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [resultCountries, setResultCountries] = useState([]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching countries: ", error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setResultCountries(result.data);
  }, [result])

  const getCountries = async () => {
    await fetchAPI({
      method: "GET",
      route: "misc/countries",
      body: null,
      log: false,
      showReply: false,
    });
  };

  return { resultCountries , errorCountries: error, loadingCountries: loading, getCountries };
}

export { useCountries };
