/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import styles from "./SimilarRecipesSwiper.module.scss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ImgWithLoading from "../ImgWithLoading";
import { NavLink } from "react-router-dom";
import { useSimilarRecipes } from "../../hooks/api/useSimilarRecipes";
import { useEffect, useState } from "react";

function SimilarRecipesSwiper({ similarParam }) {

    const [loading, setLoading] = useState(true);

  const {
    resultSimilarRecipes: similarRecipes,
    getSimilarRecipes,
    loadingSimilarRecipes,
  } = useSimilarRecipes();


  useEffect(() => {
    getSimilarRecipes(similarParam);
  }, [similarParam]);

  useEffect(() => {
    getSimilarRecipes(similarParam);
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(loadingSimilarRecipes);
    }, 20);
    return () => clearTimeout(timer);
  }, [loadingSimilarRecipes,]);

  return (
    <>
    {loading ? <div className={styles.skeleton}></div> :
    <div className={styles.SimilarRecipesContainer}>
      <span className={styles.SimilarRecipesTitle}>Similar Recipes</span>
      <div className={styles.SimilarRecipesCards}>
        <Swiper slidesPerView="3" className={styles.similarSwiper}>
          {similarRecipes?.map((recipe) => (
            <SwiperSlide key={recipe.id}>
              <NavLink to={`/recipe/${recipe.id}`}
                className={styles.SimilarRecipesImageContainer}>
                <ImgWithLoading
                  src={recipe.miniatura[0]}
                  alt="Similar Recipe Image"
                  loading="lazy"
                  className={styles.SimilarRecipesImage}
                />
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>}
    </>
  );
}

SimilarRecipesSwiper.defaultProps = {
};

SimilarRecipesSwiper.propTypes = {
  similarParam: PropTypes.string.isRequired || PropTypes.number.isRequired,
};

export default SimilarRecipesSwiper;
