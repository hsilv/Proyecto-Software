import { useContext, useEffect, useState } from "react";
import styles from"./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Carousel from "../../components/Carousel/Carousel";
import { useAPI } from "../../hooks/useAPI";
import { SessionContext } from "../../context/sessionContext";


function Home() {
  const { fetchAPI } = useAPI();
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [popularRecipesByCategory, setPopularRecipesByCategory] = useState([]);
  const { checkSession } = useContext(SessionContext);
  const [popularByCategory, setPopularByCategory] = useState([]);

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
    checkSession();
  }, []);

  useEffect(() => {
    const fetchPopularRecipesByCategory = async () => {
      try {
        const res = await fetchAPI({
          method: 'GET',
          route: `recipe/ByCategory?categoria=${'Postres'}`,
          body: null,
          log: true,
          showReply: true,
      });
        setPopularRecipesByCategory(res);
      } catch (error) {
        console.error("Error fetching popular recipes: ", error);
      }
    };

    fetchPopularRecipesByCategory();
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.homeElementsContainer}>
        <div className={styles.welcomeBackContainer}>
          <div className={styles.welcomeBackInfo}>
            <h1 style={{fontSize:'1.7rem'}}>Hey there Carlos!</h1>
            <p>Are you feeling hungry for some delicious inspiration? Get ready to explore a world of amazing recipes!</p>
          </div>
          <img src="assets/pancakes.png"/>
        </div>
        <h1 style={{margin:'70px 50px', width: 'fit-content', borderBottom: 'thin solid #212529', paddingRight: '10vw'}}>Popular Recipes This Week</h1>
      </div>
    </>
  );
}

export default Home;
