/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import styles from "./SimilarRecipesSwiper.module.scss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ImgWithLoading from "../ImgWithLoading";
import { NavLink } from "react-router-dom";
import { useSimilarRecipes } from "../../hooks/api/useSimilarRecipes";
import { useEffect } from "react";

function SimilarRecipesSwiper({ similarParam, loadingHandler }) {

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

  return (
    <>
    {loadingSimilarRecipes ? <div className={styles.skeleton}></div> :
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
    loadingHandler: () => {},
};

SimilarRecipesSwiper.propTypes = {
  similarParam: PropTypes.string.isRequired || PropTypes.number.isRequired,
  loadingHandler: PropTypes.func,
};

export default SimilarRecipesSwiper;
