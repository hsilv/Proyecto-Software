import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { SessionContext } from "../../context/sessionContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { categories } from "../../data/home";
import { usePopularRecipes } from "../../hooks/api/usePopularRecipes";

function Home() {
  const { checkSession, userInfo } = useContext(SessionContext);
  const {resultPopularRecipes: popularRecipes, getPopularRecipes} = usePopularRecipes();

  useEffect(() => {
    getPopularRecipes();
    checkSession();
  }, []);


  return (
    <>
      <NavBar />
      <div className={styles.homeElementsContainer}>
        <div className={styles.welcomeBackContainer}>
          <div className={styles.welcomeBackInfo}>
            <h1 style={{ fontSize: '3rem' }}>Hey there {userInfo.name}!</h1>
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
            navigation={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
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