import React, { useState } from "react";
import useApi from "./useApi";

export const useSession = () => {
  const { loading, data, handleRequest } = useApi();
  const [session, setSession] = useState(false);
  
  const checkSession = async () => {
    const response = await handleRequest("POST", "/checkLog", undefined, {
      Authorization: localStorage.getItem("cook"),
    });
    if(response.log === 'valid'){
        setSession(true)
        return true
    }
    else{
        setSession(false)
        return false
    }

  };

  const getUser = async () => {
    const response = await handleRequest("POST", "/getUsername", undefined, {
      Authorization: localStorage.getItem("cook"),
    });
    console.log(response.username);
    return response.username;
  }
 
  return {
    getUser,
    session,
    checkSession,
  };
};

export const handleLogOut = () => {
    localStorage.removeItem("cook");
    window.location.replace("http://localhost:5173/");
  };

export default useSession;
