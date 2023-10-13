import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";

/**
 *
 */

function usePopularRecipes() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [resultPopularRecipes, setResultPopularRecipes] = useState([]);

  useEffect(() => {
    if (error) {
      console.error(`Error fetching similar recipes : `, error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setResultPopularRecipes(result.data);
  }, [result])

  const getPopularRecipes = async () => {
    await fetchAPI({
      method: "GET",
      route: `recipe/`,
      body: null,
      log: false,
      showReply: false,
    });
  };

  return {
    resultPopularRecipes,
    errorPopularRecipes: error,
    loadingPopularRecipes: loading,
    getPopularRecipes
  };
}

export { usePopularRecipes };
