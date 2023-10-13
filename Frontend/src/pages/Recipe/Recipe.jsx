/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Recipe.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Ratings from "../../components/Ratings/Ratings";
import { TbFolderPlus, TbHeartPlus } from "react-icons/tb";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CommentBlock from "../../components/CommentBlock/CommentBlock";
import { useRecipeDetails } from "../../hooks/api/useRecipe";
import { useSimilarRecipes } from "../../hooks/api/useSimilarRecipes";
import { useRecipeComments } from "../../hooks/api/useComments";


function Recipe() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [refreshComments, setRefreshComments] = useState(0);
  const [recipeCountry, setRecipeCountry] = useState("");
  const {getRecipeDetails, resultRecipeDetails: detailsRecipe} = useRecipeDetails(id);
  const {resultSimilarRecipes: similarRecipes, getSimilarRecipes} = useSimilarRecipes();
  const {getRecipeComments, resultRecipeComments: comments, loadingRecipeComments} = useRecipeComments();

  const renderBlock = (title, subtitle) => (
    <div className={styles.Block}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );

  function renderIngredients(title, data) {
    return (
      <div>
        <h1 style={{ fontSize: '1.7rem' }}>{title}</h1>
        <ul>
          {data?.map((value, index) => {
            const [ingredient, amount] = value.split(",");
            return (
              <li key={index}>
                {ingredient.slice(1)} - {amount.slice(0, -1)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  function renderSteps(title, data) {
    return (
      <div>
        <h1 style={{ fontSize: '1.7rem', marginTop: '50px' }}>{title}</h1>
        <ul>
          {data?.map((value, index) => (
            <li key={index}>{value.descripcion}</li>
          ))}
        </ul>
      </div>
    );
  }

  useEffect(() => {
    getRecipeDetails();
    getRecipeComments(id);
  }, [id]); 

  useEffect(() => {
    if(refreshComments === 1){
      getRecipeComments(id)
    }
  }, [refreshComments])

  useEffect(() => {
    if (detailsRecipe.pais) setRecipeCountry(detailsRecipe.pais);
  }, [detailsRecipe.pais]);

  useEffect(() => {
    getSimilarRecipes(recipeCountry);
  }, [recipeCountry])

  return (
    <>
      <NavBar />
      <div className={styles.RecipeInfoContainer}>
        <div className={styles.RecipeImageContainer}>
          <img
            src={
              detailsRecipe.miniatura && detailsRecipe.miniatura[0]?.url
                ? detailsRecipe.miniatura[0]?.url
                : 'https://fakeimg.pl/1920x1080/161616'
            }
            placeholder="Imagen de Receta"
            alt="Recipe"
          />
        </div>
        <div className={styles.RecipeDetails}>
          <div className={styles.UserInteractionsContainer}>
            <h2>@{detailsRecipe.usuario?.username}</h2>
            <TbFolderPlus fontSize={'24px'} />
            <TbHeartPlus fontSize={'24px'} />
          </div>
          <h1>{detailsRecipe ? detailsRecipe.nombre : 'Placeholder'}</h1>
          <Ratings value={detailsRecipe.avg_calificacion} color={'#434343'} />
          <p>{detailsRecipe.descripcion}</p>
          <div className={styles.DetailsContainer}>
            {renderBlock(detailsRecipe.tiempo, 'minutes')}
            {renderBlock(detailsRecipe ? detailsRecipe.ingredientes?.length : 0, 'ingredients')}
            {renderBlock(detailsRecipe.porciones, 'portion(s)')}
            {renderBlock(detailsRecipe.calorias, 'calories/portion')}
          </div>
          <div className={styles.SimilarRecipesContainer}>
            <p
              style={{
                marginBlockEnd: '0',
                transform:
                  'translateX(-15%) translateY(5%) rotate(-90deg)',
              }}
            >
              Similar Recipes
            </p>
            <div className={styles.SimilarRecipesCards}>
              <Swiper
                slidesPerView="3"
              >
                {similarRecipes?.map((recipe) => (
                  <SwiperSlide key={recipe.id}>
                    <div className={styles.SimilarRecipesImageContainer} onClick={() => {navigate(`/recipe/${recipe.id}`)}}><img src={recipe.miniatura[0]}/></div>
                  </SwiperSlide>
                ))}
                
              </Swiper>
            </div>
          </div>
          <div className={styles.RecipeInstructions}>
            {renderIngredients('Ingredients', detailsRecipe ? detailsRecipe.ingredientes : ["", ""])}
            {renderSteps('Steps', detailsRecipe.paso)}
            <CommentBlock comments={comments? (comments.status? undefined: comments) : comments} loading={loadingRecipeComments} idRecipe={parseInt(id)} refreshTrigger={setRefreshComments}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;
