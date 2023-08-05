import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Carousel from "../../components/Carousel/Carousel";
import { useAPI } from "../../hooks/useAPI";
import { SessionContext } from "../../context/sessionContext";


function Home() {
  const { fetchAPI } = useAPI();
  const [popularRecipes, setPopularRecipes] = useState([]);
  const { checkSession } = useContext(SessionContext);
  const [popularByCategory, setPopularByCategory] = useState([])

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
  
  useEffect(() => {
    const fetchPopularRecipesCategory = async () => {
      try {
        const res = await fetchAPI({
          method: 'GET',
          route: 'recipeByCategory/',
          body: null,
          log: true,
          showReply: true,
      });
      console.log(res.data);
        setPopularByCategory(res.data);
      } catch (error) {
        console.error("Error fetching popular recipes: ", error);
      }
    };

    fetchPopularRecipesCategory();
  }, []);

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="Home">
      <NavBar />
      <h1>Popular Recipes This Week</h1>
      <Carousel recipes={popularRecipes}/>

      <h1>Popular Recipes by Category</h1>
      <h2 style={{marginLeft:"45px", fontSize:"2.1rem"}}>Desserts</h2>
      <Carousel recipes={popularRecipes}/>
    </div>
  );
}

export default Home;
