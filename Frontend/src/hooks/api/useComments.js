import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";

/**
 *
 */

function useRecipeComments() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [resultRecipeComments, setResultRecipeComments] = useState([]);

  useEffect(() => {
    if (error) {
      console.error(`Error fetching recipe comments : `, error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setResultRecipeComments(result);
  }, [result])

  const getRecipeComments = async (id) => {
    await fetchAPI({
      method: "GET",
      route: `recipe/comments?id=${id}`,
      body: null,
      log: false,
      showReply: false,
    });
  };

  return {
    resultRecipeComments,
    errorRecipeComments: error,
    loadingRecipeComments: loading,
    getRecipeComments
  };
}

export { useRecipeComments };
