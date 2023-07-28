import { useContext, useEffect, useState } from "react";
import "./Home.css";
import NavBar from "../../components/NavBar/NavBar";
import Carousel from "../../components/Carousel/Carousel";
import { useAPI } from "../../hooks/useAPI";
import { SessionContext } from "../../context/sessionContext";


function Home() {
  const {fetchAPI} = useAPI();
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const { checkSession } = useContext(SessionContext);

  const arrowCallback = (value) => {
    if(!(currentRecipeIndex + value > popularRecipes.length - 1 || currentRecipeIndex + value < 0)) {
      setCurrentRecipeIndex(currentRecipeIndex + value)
    }
  }

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const res = await fetchAPI({
          method: 'GET',
          route: 'recipe/',
          body: null,
          log: true,
          showReply: true,
      });
      console.log(res.data);
        setPopularRecipes(res.data);
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

 const handleRedirection = () => {
    window.location.replace("http://localhost:5173/recipe?id="+popularRecipes[currentRecipeIndex].id);
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="Home">
      <NavBar />
      <h1>Popular Recipes This Week</h1>
      <Carousel
        title={popularRecipes[currentRecipeIndex]?.nombre}
        user={popularRecipes[currentRecipeIndex]?.usuario.username}
        description={popularRecipes[currentRecipeIndex]?.descripcion}
        ratings={popularRecipes[currentRecipeIndex]?.avg_calificacion}
        time ={popularRecipes[currentRecipeIndex]?.tiempo}
        img_url = {popularRecipes[currentRecipeIndex]?.miniatura[0] ? popularRecipes[currentRecipeIndex]?.miniatura[0].url: 'https://fakeimg.pl/1920x1080/ff0000'}
        callback={arrowCallback}
        onNext={handleNextRecipe}
        onPrevious={handlePreviousRecipe}
        redir={handleRedirection}
      />
    </div>
  );
}

export default Home;
