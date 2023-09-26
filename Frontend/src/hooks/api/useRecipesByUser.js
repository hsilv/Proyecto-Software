import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";

/**
 *
 */

function useRecipesByUser() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [resultRecipesByUser, setResultRecipesByUser] = useState([]);

  useEffect(() => {
    if (error) {
      console.error(`Error fetching recipes by user : `, error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setResultRecipesByUser(result.data);
  }, [result])

  const getRecipesByUser = async (username) => {
    await fetchAPI({
      method: "GET",
      route: `recipe/byUser?username=${username}`,
      body: null,
      log: false,
      showReply: false,
    });
  };

  return {
    resultRecipesByUser,
    errorRecipesByUser: error,
    loadingRecipesByUser: loading,
    getRecipesByUser
  };
}

export { useRecipesByUser };
