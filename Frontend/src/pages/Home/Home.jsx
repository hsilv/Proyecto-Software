import React, { useEffect, useState } from "react";
import useSession from "../../hooks/session";
import "./Home.css";
import NavBar from "../../components/NavBar/NavBar";
import Carousel from "../../components/Carousel/Carousel";
import useApi from "../../hooks/useApi";

function Home() {
  const { session, checkSession } = useSession();
  const { loading, data, handleRequest } = useApi();
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const response = await handleRequest("GET", "/home");
        setPopularRecipes(response);
        console.log(response)
      } catch (error) {
        console.error("Error fetching popular recipes: ", error);
      }
    };

    fetchPopularRecipes();
  }, []);

  const handleNextRecipe = () => {
    setCurrentRecipeIndex((prevIndex) =>
      prevIndex < popularRecipes.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousRecipe = () => {
    setCurrentRecipeIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : popularRecipes.length - 1
    );
  };

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

  return (
    <div className="Home">
      <NavBar />
      <h1>Popular Recipes This Week</h1>
      <Carousel
        title={popularRecipes[currentRecipeIndex]?.nombre}
        user={popularRecipes[currentRecipeIndex]?.username}
        description={popularRecipes[currentRecipeIndex]?.description}
        ratings={popularRecipes[currentRecipeIndex]?.ratings}
        onNext={handleNextRecipe}
        onPrevious={handlePreviousRecipe}
      />
    </div>
  );
}

export default Home;
