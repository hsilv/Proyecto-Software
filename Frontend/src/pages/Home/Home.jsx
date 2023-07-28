import { useContext, useEffect } from "react";
import "./Home.css";
import NavBar from "../../components/NavBar/NavBar";
import Carousel from "../../components/Carousel/Carousel";
import { SessionContext } from "../../context/sessionContext";

function Home() {
  const { checkSession } = useContext(SessionContext);
/*   const { session, checkSession } = useSession(); */
/*   const { loading, data, handleRequest } = useApi(); */
  /* const [popularRecipes, setPopularRecipes] = useState([]); */
  /* const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0); */

  /* const arrowCallback = (value) => {
    if(!(currentRecipeIndex + value > popularRecipes.length - 1 || currentRecipeIndex + value < 0)) {
      setCurrentRecipeIndex(currentRecipeIndex + value)
    }
  } */

  useEffect(() => {
    /* const fetchPopularRecipes = async () => {
      try {
        const response = await handleRequest("GET", "/home");
        setPopularRecipes(response);
        console.log(session)
      } catch (error) {
        console.error("Error fetching popular recipes: ", error);
      }
    };

    fetchPopularRecipes(); */
  }, []);

 /*  const handleNextRecipe = () => {
    setCurrentRecipeIndex((prevIndex) =>
      prevIndex < popularRecipes.length - 1 ? prevIndex + 1 : 0
    );
  };
 */
  /* const handlePreviousRecipe = () => {
    setCurrentRecipeIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : popularRecipes.length - 1
    );
  }; */

 /*  const handleRedirection = () => {
    window.location.replace("http://localhost:5173/recipe?id="+popularRecipes[currentRecipeIndex].id);
  } */

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="Home">
      <NavBar />
      <h1>Popular Recipes This Week</h1>
      <Carousel
        /* title={popularRecipes[currentRecipeIndex]?.nombre}
        user={popularRecipes[currentRecipeIndex]?.username}
        description={popularRecipes[currentRecipeIndex]?.descripcion}
        ratings={popularRecipes[currentRecipeIndex]?.avg_calificacion}
        time ={popularRecipes[currentRecipeIndex]?.tiempo}
        img_url = {popularRecipes[currentRecipeIndex]?.url_minatura}
        callback={arrowCallback}
        onNext={handleNextRecipe}
        onPrevious={handlePreviousRecipe}
        redir={handleRedirection} */
      />
    </div>
  );
}

export default Home;
