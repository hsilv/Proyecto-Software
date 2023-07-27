import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { useAPI } from "./useAPI.js";

function useSession() {
  const [ logged, setLogged ] = useState(false);
  const { item, saveItem } = useLocalStorage("cookapptoken", "", true);
  const { loading, error, fetchAPI } = useAPI();
  const [ loginError, setLoginError ] = useState();

  useEffect(() => {
    checkSession();
  }, []);



  const login = async (username, password) => {
    const res = await fetchAPI({
      method: "POST",
      route: "auth/login",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      log: true,
      showReply: true,
    });

    if (res) {
      if (res.token) {
        saveItem(res.token);
        setLogged(true);
      } else if(res.status) {
        setLogged(false);
        setLoginError(res);
      }
    }
  };

  const logOut = () => {
    saveItem("");
  };

  const checkSession = async () => {
    const res = await fetchAPI({
      route: "auth/check",
      method: "POST",
      headers: {
        Authorization: item,
      },
      log: true,
      showReply: true,
    });

    if (res) {
      if (res.username) {
        saveItem(item);
        setLogged(true);
      } else if (res.status) {
        setLogged(false);
        setLoginError(res);
      }
    } else {
      setLogged(false);
    }
  };

  return { logged, login, loading, error, logOut, checkSession, loginError };
}

export { useSession };
