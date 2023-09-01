import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { useAPI } from "../../hooks/useAPI";
import { SessionContext } from "../../context/sessionContext";
import { TbSeeding, TbCake, TbCoffee, TbAlarm } from "react-icons/tb";
import { BiParty } from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

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

  // Categorias Fijas
  const categories = [
    { icon: <TbSeeding fontSize="2rem" />, name: "Vegan", value: "Vegana" },
    { icon: <TbCake fontSize="2rem" />, name: "Sweet", value: "Postres"},
    { icon: <TbCoffee fontSize="2rem" />, name: "Drinks", value: "Bebidas" },
    { icon: <TbAlarm fontSize="2rem" />, name: "Fast", value: "Rápidas" },
    { icon: <BiParty fontSize="2rem" />, name: "Party", value: "Fiestas" },
  ];

  return (
    <>
      <NavBar />
      <div className={styles.homeElementsContainer}>
        <div className={styles.welcomeBackContainer}>
          <div className={styles.welcomeBackInfo}>
            <h1 style={{ fontSize: '1.7rem' }}>Hey there Carlos!</h1>
            <p>Are you feeling hungry for some delicious inspiration? Get ready to explore a world of amazing recipes!</p>
          </div>
          <img src="assets/pancakes.png" alt="Pancakes" />
        </div>
        <h1 style={{ marginBlockEnd: 0, margin: '30px 50px', width: 'fit-content', borderBottom: 'thin solid #212529', paddingRight: '10vw' }}>Top Rated Recipes</h1>
        <div className={styles.swiperWraper}>
          <Swiper
            effect={'coverflow'}
            centeredSlides={true}
            slidesPerView={3}
            pagination={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            modules={[EffectCoverflow, Pagination]}
          >
            {popularRecipes.map((recipe) => (
              <SwiperSlide key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <h1 style={{ marginBlockEnd: 0, margin: '30px 50px', width: 'fit-content', borderBottom: 'thin solid #212529', paddingRight: '10vw' }}>Browse Categories</h1>
        <div className={styles.homeCategoriesContainer}>
          {categories.map((category, index) => (
            <CategoryCard key={index} icon={category.icon} name={category.name} value={category.value} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
