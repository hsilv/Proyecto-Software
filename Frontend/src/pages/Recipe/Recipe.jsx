/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Recipe.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Ratings from "../../components/Ratings/Ratings";
import { TbFolderPlus, TbHeart } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillPlusCircle } from "react-icons/ai";
import "swiper/css";
import CommentBlock from "../../components/CommentBlock/CommentBlock";
import { useRecipeDetails } from "../../hooks/api/useRecipe";
import { useSimilarRecipes } from "../../hooks/api/useSimilarRecipes";
import { useRecipeComments } from "../../hooks/api/useComments";
import Modal from "../../components/Modal/Modal";
import { CgClose } from "react-icons/cg";
import { useCollectionsByUser } from "../../hooks/api/useCollectionsByUser";
import { SessionContext } from "../../context/sessionContext";
import Loading from "../../components/Loading";

function Recipe() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [refreshComments, setRefreshComments] = useState(0);
  const [recipeCountry, setRecipeCountry] = useState("");
  const [showCollModal, setShowCollModal] = useState(false);
  const [transStyles, setTransStyles] = useState(false);

  const {
    getRecipeDetails,
    resultRecipeDetails: detailsRecipe,
    loadingRecipeDetails,
  } = useRecipeDetails(id);

  const {
    resultSimilarRecipes: similarRecipes,
    getSimilarRecipes,
    loadingSimilarRecipes,
  } = useSimilarRecipes();

  const {
    getRecipeComments,
    resultRecipeComments: comments,
    loadingRecipeComments,
  } = useRecipeComments();

  const { userInfo } = useContext(SessionContext);

  const { getCollectionsByUser, resultCollectionsByUser } =
    useCollectionsByUser();

  const { postRecipeToColl } = useCollectionsByUser();

  useEffect(() => {
    if (userInfo) {
      getCollectionsByUser(userInfo.idUser);
    }
  }, [userInfo]);

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

  useEffect(() => {
    getRecipeDetails();
    getRecipeComments(id);
  }, [id]);

  useEffect(() => {
    if (refreshComments >= 1) {
      getRecipeComments(id);
    }
  }, [refreshComments]);

  useEffect(() => {
    if (detailsRecipe.pais) setRecipeCountry(detailsRecipe.pais);
  }, [detailsRecipe.pais]);

  useEffect(() => {
    getSimilarRecipes(recipeCountry);
  }, [recipeCountry]);

  const handleAddColection = () => {
    toggleModal();
  };

  const toggleModal = async () => {
    if (showCollModal) {
      setTransStyles(false);
      await setTimeout(() => setShowCollModal(false), 400);
    } else {
      setShowCollModal(true);
      setTimeout(() => setTransStyles(true), 50);
    }
  };

  const handleFavorite = () => {
    console.log("Añadir favorita");
  };

  const handleAddRecipe = (idColl, recipeID) => {
    postRecipeToColl(idColl, recipeID);
  };

  return (
    <>
      <NavBar />
      <div className={styles.RecipeInfoContainer}>
        <div className={styles.RecipeImageContainer}>
          <img
            src={
              detailsRecipe.miniatura && detailsRecipe.miniatura[0]?.url
                ? detailsRecipe.miniatura[0]?.url
                : "https://fakeimg.pl/1920x1080/161616"
            }
            placeholder="Imagen de Receta"
            alt="Recipe"
          />
        </div>
        <div className={styles.RecipeDetails}>
          <div className={styles.UserInteractionsContainer}>
            <div className={styles.interactions}>
              <h2>@{detailsRecipe.usuario?.username}</h2>
              <TbFolderPlus
                fontSize={"24px"}
                className={styles.intButton}
                onClick={handleAddColection}
              />
              <TbHeart
                fontSize={"24px"}
                className={styles.intButton}
                onClick={handleFavorite}
              />
            </div>
            <div className={styles.recipeName}>
              <h1>{detailsRecipe ? detailsRecipe.nombre : "Placeholder"}</h1>
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
          <div className={styles.SimilarRecipesContainer}>
            <p
              style={{
                marginBlockEnd: "0",
                transform: "translateX(-15%) translateY(5%) rotate(-90deg)",
              }}
            >
              Similar Recipes
            </p>
            <div className={styles.SimilarRecipesCards}>
              <Swiper slidesPerView="3">
                {similarRecipes?.map((recipe) => (
                  <SwiperSlide key={recipe.id}>
                    <div
                      className={styles.SimilarRecipesImageContainer}
                      onClick={() => {
                        navigate(`/recipe/${recipe.id}`);
                      }}
                    >
                      <img src={recipe.miniatura[0]} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={styles.RecipeInstructions}>
            {renderIngredients(
              "Ingredients",
              detailsRecipe ? detailsRecipe.ingredientes : ["", ""]
            )}
            {renderSteps("Steps", detailsRecipe.paso)}
            <CommentBlock
              comments={
                comments ? (comments.status ? undefined : comments) : comments
              }
              loading={loadingRecipeComments}
              idRecipe={parseInt(id)}
              refreshTrigger={setRefreshComments}
              idOP={detailsRecipe.usuario?.id}
            />
          </div>
        </div>
      </div>
      <Modal show={showCollModal}>
        <div
          className={`${styles.addCollModal} ${
            transStyles ? styles.showedCollModal : ""
          }`}
        >
          <div className={styles.addToCollCard}>
            <div className={styles.cardModalHeader}>
              <h2>Añadir receta a una colección</h2>
              <button onClick={toggleModal} className={styles.closerModal}>
                <CgClose />
              </button>
            </div>
            <div className={styles.cardModalBody}>
              <ul className={styles.collList}>
                {resultCollectionsByUser ? (
                  resultCollectionsByUser.length > 0 &&
                  resultCollectionsByUser.map((value) => {
                    return (
                      <li
                        key={`${value.id} ${value.nombre} ${value.user_id}`}
                        className={styles.collItem}
                      >
                        <span>{value.nombre}</span>
                        <button
                          className={styles.collItemButton}
                          onClick={() => handleAddRecipe(value.id, id)}
                        >
                          <AiFillPlusCircle />
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <span className={styles.collPlaceholder}>
                    Aún no tienes colecciones!
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
      <Loading loading={loadingRecipeDetails && loadingSimilarRecipes} />
    </>
  );
}

export default Recipe;
