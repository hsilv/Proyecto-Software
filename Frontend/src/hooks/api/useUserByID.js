import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";

/**
 *
 */

function useUserByID() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [resultUserByID, setResultUserByID] = useState([]);

  useEffect(() => {
    if (error) {
      console.error(`Error fetching user : `, error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setResultUserByID(result.data[0]);
  }, [result])

  const getUserByID = async (param) => {
    await fetchAPI({
      method: "GET",
      route: `user?id=${param}`,
      body: null,
      log: false,
      showReply: false,
    });
  };

  return {
    resultUserByID,
    errorUserByID: error,
    loadingUserByID: loading,
    getUserByID
  };
}

export { useUserByID };
