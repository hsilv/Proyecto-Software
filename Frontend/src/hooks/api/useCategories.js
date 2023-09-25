import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";

/**
 *
 */

function useCategories() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [resultCategories, setResultCategories] = useState([]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching Categories: ", error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setResultCategories(result.data);
  }, [result])

  const getCategories = async () => {
    await fetchAPI({
      method: "GET",
      route: "misc/categories",
      body: null,
      log: false,
      showReply: false,
    });
  };

  return { resultCategories , errorCategories: error, loadingCategories: loading, getCategories };
}

export { useCategories };
