import React, { useEffect, useState } from "react";
import useSession from "../../hooks/session";
import "./Home.css";
import NavBar from "../../components/NavBar/NavBar";
import { handleLogOut } from "../../hooks/session";
import Carousel from "../../components/Carousel/Carousel";
import useApi from "../../hooks/useApi";


function Home() {
  const { session, checkSession } = useSession();
  const { handleRequest } = useApi()

  const postRecipes = async () => {
    const response = await handleRequest('GET', '/home')
    if (response.success) {
      console.log(response)
    }
  }

  const handleRecipes = () => {
    postRecipes()
  }

  useEffect(() => {
    const verifySession = async () => {
      try {
        if (await checkSession()) {
          console.log("Estás logeado");
          handleRecipes()
        } else {
         window.location.replace("http://localhost:5173/");
        }
      } catch (error) {
        console.error("Verify process error: ", error);
      }
    };

    verifySession();
  }, []);


  return (
    <div className="Home">
      <NavBar />
      <h1>Popular Recipes This Week</h1>
      <Carousel />
    </div>
  );
}

export default Home;
