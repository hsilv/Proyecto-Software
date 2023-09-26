import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";

/**
 *
 */

function useRecipeDetails(id) {
  const { fetchAPI, error, loading, result } = useAPI();
  const [resultRecipeDetails, setResultRecipeDetails] = useState([]);

  useEffect(() => {
    if (error) {
      console.error(`Error fetching details of recipe (${id}) : `, error.status, error.message);
    }
  }, [error, id]);

  useEffect(() => {
    if (result) setResultRecipeDetails(result.data[0]);
  }, [result])

  const getRecipeDetails = async () => {
    await fetchAPI({
      method: "GET",
      route: `recipe?id=${id}`,
      body: null,
      log: false,
      showReply: false,
    });
  };

  return {
    resultRecipeDetails,
    errorRecipeDetails: error,
    loadingRecipeDetails: loading,
    getRecipeDetails
  };
}

export { useRecipeDetails };
