import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";

function useNotifications() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [resultNotifications, setResultNotifications] = useState([]);

  useEffect(() => {
    if (error) {
      console.error(`Error fetching notifications : `, error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setResultNotifications(result);
  }, [result])

  const getNotifications = async (userID) => {
    await fetchAPI({
      method: "GET",
      route: `user/notifications?recipientID=${userID}`,
      body: null,
      log: false,
      showReply: false,
    });
  };

  const postNotification = async (description, recipientID, senderID, recipeID) => {
    await fetchAPI({
      method: "POST",
      route: `user/postNotification`,
      body: JSON.stringify({
        description: description,
        recipientID: recipientID,
        senderID: senderID,
        recipeID: recipeID,
      }),
      log: false,
      showReply: false,
    });
  };

  return {
    resultNotifications,
    errorNotifications: error,
    loadingNotifications: loading,
    getNotifications,
    postNotification
  };
}

export { useNotifications };