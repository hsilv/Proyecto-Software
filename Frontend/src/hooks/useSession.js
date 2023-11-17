/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { useAPI } from "./useAPI.js";

function useSession() {
  const [ logged, setLogged ] = useState(false);
  const { item, saveItem } = useLocalStorage("cookapptoken", "", true);
  const { item: userInfo, saveItem: saveUserInfo } = useLocalStorage("cookappuser", {}, false);
  const { result, loading, error, fetchAPI } = useAPI();
  const [ loginError, setLoginError ] = useState();

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if(loginError) {
      saveUserInfo("")
      saveItem("not");
      setLogged(false);
    }
  }, [loginError])

  useEffect(() => {
    if(result && result.error){
      setLogged(false);
      setLoginError(result);
    }
  }, [result])

  useEffect(() => {
    if(logged) {
      checkSession();
    }
  }, [logged])



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
        setLoginError(null);
      } else if(res.status || res.error) {
        setLogged(false);
        setLoginError(res);
      }
    }
  };

  const logOut = async () => {
    await fetchAPI({
      route: "auth/logout",
      method: "PUT",
      log: false,
      showReply: false,
    });
    saveItem("not");
    saveUserInfo("");
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
        setLoginError(null);
      } else if (res.status) {
        setLogged(false);
        setLoginError(res);
        logOut();
      }
    } else {
      setLogged(false);
      logOut();
    }
  };

  return { logged, login, loading, error, logOut, checkSession, loginError, userInfo };
}

export { useSession };
