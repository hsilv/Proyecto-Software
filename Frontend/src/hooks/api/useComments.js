import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";
import { useLocalStorage } from '../useLocalStorage';

/**
 *
 */

function useRecipeComments() {
  const { fetchAPI, error, loading, result } = useAPI();
  const { item } = useLocalStorage("cookapptoken", "", true);
  const [resultRecipeComments, setResultRecipeComments] = useState([]);

  useEffect(() => {
    if (error) {
      console.error(`Error fetching recipe comments : `, error.status, error.message);
      console.log(error);
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

  const postRecipeComment = async ({
    id_user,
    id_recipe,
    comment,
    qualification,
  }) => {
    await fetchAPI({
      method: "POST",
      route: `recipe/comments`,
      body: JSON.stringify({
        id_user: parseInt(id_user),
        id_recipe: parseInt(id_recipe),
        comment,
        qualification: parseFloat(qualification),
      }),
      log: false,
      showReply: true,
    });
  }

  const deleteRecipeOwnComment = async ({
    id_recipe,
  }) => {
    await fetchAPI({
      method: "DELETE",
      route: `recipe/comments`,
      headers: {
        Authorization: item,
      },
      body: JSON.stringify({
        id_recipe: parseInt(id_recipe),
      }),
      log: false,
      showReply: true,
    });
  }

  const checkUserComment = async ({
    id_user,
    id_recipe,
  }) => {
    await fetchAPI({
      method: "POST",
      route: `recipe/comments/check`,
      body: JSON.stringify({
        id_user: parseInt(id_user),
        id_recipe: parseInt(id_recipe),
      }),
      log: false,
      showReply: false,
    });
  }

  return {
    resultRecipeComments,
    errorRecipeComments: error,
    loadingRecipeComments: loading,
    getRecipeComments,
    postRecipeComment,
    checkUserComment,
    deleteRecipeOwnComment,
  };
}

export { useRecipeComments };
