import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { useAPI } from "./useAPI.js";

function useSession() {
  const [ logged, setLogged ] = useState(false);
  const { item, saveItem } = useLocalStorage("cookapptoken", "", true);
  const { item: userInfo, saveItem: saveUserInfo } = useLocalStorage("cookappuser", {}, false);
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
      log: false,
      showReply: false,
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
    setLogged(false);
  };

  const checkSession = async () => {
    const res = await fetchAPI({
      route: "auth/check",
      method: "POST",
      headers: {
        Authorization: item,
      },
      log: false,
      showReply: false,
    });

    if (res) {
      if (res.username) {
        saveUserInfo(res);
        setLogged(true);
      } else if (res.status) {
        setLogged(false);
        setLoginError(res);
      }
    } else {
      setLogged(false);
    }
  };

  return { logged, login, loading, error, logOut, checkSession, loginError, userInfo };
}

export { useSession };
