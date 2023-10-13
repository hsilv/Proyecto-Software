import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";

/**
 *
 */

function useSimilarRecipes() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [resultSimilarRecipes, setResultSimilarRecipes] = useState([]);

  useEffect(() => {
    if (error) {
      console.error(`Error fetching similar recipes : `, error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setResultSimilarRecipes(result);
  }, [result])

  const getSimilarRecipes = async (param) => {
    await fetchAPI({
      method: "GET",
      route: `search?text=${param}`,
      body: null,
      log: false,
      showReply: false,
    });
  };

  return {
    resultSimilarRecipes,
    errorSimilarRecipes: error,
    loadingSimilarRecipes: loading,
    getSimilarRecipes
  };
}

export { useSimilarRecipes };
