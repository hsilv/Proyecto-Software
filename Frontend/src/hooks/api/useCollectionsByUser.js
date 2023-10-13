import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";

/**
 *
 */

function useCollectionsByUser() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [resultCollectionsByUser, setResultCollectionsByUser] = useState([]);

  useEffect(() => {
    if (error) {
      console.error(`Error fetching collections of user: `, error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setResultCollectionsByUser(result);
  }, [result])

  const getCollectionsByUser = async (id) => {
    await fetchAPI({
      method: "GET",
      route: `collections/ByUser?id=${id}`,
      body: null,
      log: false,
      showReply: false,
    });
  };

  return {
    resultCollectionsByUser,
    errorCollectionsByUser: error,
    loadingCollectionsByUser: loading,
    getCollectionsByUser
  };
}

export { useCollectionsByUser };
