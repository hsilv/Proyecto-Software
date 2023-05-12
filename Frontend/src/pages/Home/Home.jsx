import React, { useEffect, useState } from "react";
import useSession from "../../hooks/session";
import "./Home.css";
import NavBar from "../../components/NavBar/NavBar";
import { handleLogOut } from "../../hooks/session";

function Home() {
  const { session, checkSession } = useSession();

  useEffect(() => {
    const verifySession = async () => {
      try {
        if (await checkSession()) {
          console.log("Estás logeado");
        } else {
         // window.location.replace("http://localhost:5173/");
        }
      } catch (error) {
        console.error("Verify process error: ", error);
      }
    };

    verifySession();
  }, []);


  return (
    <div className="Home">
      <NavBar/>
    </div>
  );
}

export default Home;
