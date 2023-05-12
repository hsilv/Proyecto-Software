import React, { useEffect, useState } from "react";
import useSession from "../../hooks/session";
import "./Home.css";

function Home() {
  const { session, checkSession } = useSession();

  useEffect(() => {
    const verifySession = async () => {
      try {
        if (await checkSession()) {
          console.log("Estás logeado");
        } else {
          window.location.replace("http://localhost:5173/");
        }
      } catch (error) {
        console.error("Verify process error: ", error);
      }
    };

    verifySession();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("cook");
    window.location.replace("http://localhost:5173/");
  };
  return (
    <div className="Home">
      Accessed
      <button onClick={handleLogOut}>Cerrar Sesión</button>
    </div>
  );
}

export default Home;
