import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { SessionContext } from "../../context/sessionContext";
import { TbSeeding, TbCake, TbCoffee, TbAlarm } from "react-icons/tb";
import { BiParty } from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { usePopularRecipes } from '../../hooks/api/usePopularRecipes';
import Loading from '../../components/Loading';

function Home() {
  const {getPopularRecipes, resultPopularRecipes: popularRecipes, loadingPopularRecipes} = usePopularRecipes();
  const { checkSession, userInfo, loading } = useContext(SessionContext);

  useEffect(() => {
    getPopularRecipes();
    checkSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className={styles.homeElementsContainer}>
        <div className={styles.welcomeBackContainer}>
          <div className={styles.welcomeBackInfo}>
            <h1 style={{ fontSize: '1.7rem' }}>Hey there {userInfo?.name}!</h1>
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
      <Loading loading={loading && loadingPopularRecipes}/>
    </>
  );
}

export default Home;