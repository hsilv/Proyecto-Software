/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "./Recipe.module.scss";
import { NavLink, useParams } from "react-router-dom";
import Ratings from "../../components/Ratings/Ratings";
import { TbFolderPlus, TbHeart } from "react-icons/tb";
import "swiper/css";
import CommentBlock from "../../components/CommentBlock/CommentBlock";
import { useRecipeDetails } from "../../hooks/api/useRecipe";
import ImgWithLoading from "../../components/ImgWithLoading";
import RecipeSkeleton from "../../components/RecipeSkeleton";
import SimilarRecipesSwiper from "../../components/SimilarRecipesSwiper/SimilarRecipesSwiper";
import AddRecipeToCollectionModal from "../../components/AddRecipeToCollectionModal";

function Recipe() {
  let { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [recipeCountry, setRecipeCountry] = useState("");
  const [showCollModal, setShowCollModal] = useState(false);

  const {
    getRecipeDetails,
    resultRecipeDetails: detailsRecipe,
    loadingRecipeDetails,
  } = useRecipeDetails(id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(loadingRecipeDetails);
    }, 20);
    return () => clearTimeout(timer);
  }, [loadingRecipeDetails]);

  useEffect(() => {
    getRecipeDetails();
  }, [id]);


  useEffect(() => {
    if (detailsRecipe.pais) setRecipeCountry(detailsRecipe.pais);
  }, [detailsRecipe.pais]);

  const renderBlock = (title, subtitle) => (
    <div className={styles.Block}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );

  function renderIngredients(title, data) {
    return (
      <div>
        <h1 style={{ fontSize: "1.7rem" }}>{title}</h1>
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
        <h1 style={{ fontSize: "1.7rem", marginTop: "50px" }}>{title}</h1>
        <ul>
          {data?.map((value, index) => (
            <li key={index}>{value.descripcion}</li>
          ))}
        </ul>
      </div>
    );
  }

  const handleAddColection = () => {
    setShowCollModal(true);
  };

  const handleFavorite = () => {
    console.log("Añadir favorita");
  };

  return (
    <>
      <div className={styles.RecipeInfoContainer}>
        <div className={styles.RecipeImageContainer}>
          <ImgWithLoading
            src={
              detailsRecipe.miniatura && detailsRecipe.miniatura[0]?.url
                ? detailsRecipe.miniatura[0]?.url
                : undefined
            }
            className={styles.RecipeImage}
            placeholder="Imagen de Receta"
            alt="Recipe"
          />
        </div>
        {loading ? (
          <RecipeSkeleton />
        ) : (
          <div className={styles.RecipeDetails}>
            <div className={styles.RecipeHeader}>
              <h1>{detailsRecipe ? detailsRecipe.nombre : "Placeholder"}</h1>
              <div className={styles.tools}>
                <h2>
                  {detailsRecipe.usuario ? (
                    <NavLink
                      className={styles.AuthorUsername}
                      to={`/profile/${detailsRecipe.usuario?.username}`}
                    >
                      @{detailsRecipe.usuario?.username}
                    </NavLink>
                  ) : null}
                </h2>
                <TbFolderPlus
                  fontSize={"30px"}
                  className={styles.intButton}
                  onClick={handleAddColection}
                />
                <TbHeart
                  fontSize={"30px"}
                  className={styles.intButton}
                  onClick={handleFavorite}
                />
              </div>
            </div>
            <Ratings value={detailsRecipe.avg_calificacion} color={"#434343"} />
            <p>{detailsRecipe.descripcion}</p>
            <div className={styles.DetailsContainer}>
              {renderBlock(detailsRecipe.tiempo, "minutes")}
              {renderBlock(
                detailsRecipe ? detailsRecipe.ingredientes?.length : 0,
                "ingredients"
              )}
              {renderBlock(detailsRecipe.porciones, "portion(s)")}
              {renderBlock(detailsRecipe.calorias, "calories/portion")}
            </div>
            <SimilarRecipesSwiper similarParam={recipeCountry} />
            <div className={styles.RecipeInstructions}>
              {renderIngredients(
                "Ingredients",
                detailsRecipe ? detailsRecipe.ingredientes : ["", ""]
              )}
              {renderSteps("Steps", detailsRecipe.paso)}
              <CommentBlock
                idRecipe={parseInt(id)}
              />
            </div>
          </div>
        )}
      </div>
      <AddRecipeToCollectionModal
        show={showCollModal}
        setCloseState={setShowCollModal}
      />
    </>
  );
}

export default Recipe;
