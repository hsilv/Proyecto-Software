import React, { useEffect, useState, useContext } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Recipe.module.css";
import { useAPI } from "../../hooks/useAPI";
import { SessionContext } from "../../context/sessionContext";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Ratings from "../../components/Ratings/Ratings";
import { TbFolderPlus, TbHeartPlus } from "react-icons/tb";

function Recipe() {
  const { checkSession } = useContext(SessionContext);
  const { fetchAPI } = useAPI();
  let {id} = useParams();
  const navigate = useNavigate();
  const [detailsRecipe, setDetailsRecipe] = useState([
    {
      nombre: "Placeholder",
      ingredientes: ["", ""],
    },
  ]);

  const renderBlock = (title, subtitle) => (
    <div className={styles.Block}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );

  useEffect(() => {
    const fetchDetailsRecipe = async () => {
      try {
        const res = await fetchAPI({
          method: 'GET',
          route: `recipe?id=${id}`,
          body: null,
          log: true,
          showReply: true,
        });
        setDetailsRecipe(res.data[0]);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };

    fetchDetailsRecipe();

  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.RecipeInfoContainer}>
        <div className={styles.RecipeImageContainer}>
          <img
            src={detailsRecipe.miniatura && detailsRecipe.miniatura[0]?.url ? detailsRecipe.miniatura[0]?.url : 'https://fakeimg.pl/1920x1080/161616'}
            placeholder="Imagen de Receta">
          </img>
        </div>
        <div className={styles.RecipeDetails}>
          <div className={styles.UserInteractionsContainer}>
            <h2>@{detailsRecipe.usuario?.username}</h2>
            <TbFolderPlus fontSize={'24px'} />
            <TbHeartPlus fontSize={'24px'} />
          </div>
          <h1>{detailsRecipe.nombre}</h1>
          <Ratings value={detailsRecipe.avg_calificacion}/>
          <p>{detailsRecipe.descripcion}</p>
          <div className={styles.DetailsContainer}>
            {renderBlock(detailsRecipe.tiempo, 'minutes')}
            {renderBlock("77", 'calories')}
            {renderBlock(detailsRecipe.ingredientes?.length, 'ingredients')}
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;
