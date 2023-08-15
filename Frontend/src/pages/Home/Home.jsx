import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { useAPI } from "../../hooks/useAPI";
import { SessionContext } from "../../context/sessionContext";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {EffectCoverflow, Pagination} from 'swiper/modules';
import RecipeCard from "../../components/RecipeCard/RecipeCard";

function Home() {
  const { fetchAPI } = useAPI();
  const [popularRecipes, setPopularRecipes] = useState([]);
  const { checkSession } = useContext(SessionContext);

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
        setPopularRecipes(res.data);
      } catch (error) {
        console.error("Error fetching popular recipes: ", error);
      }
    };

    fetchPopularRecipes();
    checkSession();
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
          <img src="assets/pancakes.png" alt="Pancakes" />
        </div>
        <h1 style={{marginBlockEnd: 0, margin:'30px 50px', width: 'fit-content', borderBottom: 'thin solid #212529', paddingRight: '10vw'}}>Popular Recipes This Week</h1>
        <div className={styles.swiperWraper}>
          <Swiper effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={3} pagination={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          modules={[EffectCoverflow, Pagination]}>
            {popularRecipes.map(recipe => (
              <SwiperSlide key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Home;
