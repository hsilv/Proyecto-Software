import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import style from "./Recipe.module.css";
import { BiBookmarkAlt, BiWorld } from "react-icons/bi";
import { BiPlusCircle, BiUserCircle, BiTime } from "react-icons/bi";
import { GiAsparagus } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";
import useApi from "../../hooks/useApi";
import useSession from "../../hooks/session";

function Recipe({ id }) {
  const { session, checkSession } = useSession();
  const { loading, data, handleRequest } = useApi();
  const [detailsRecipe, setDetailsRecipe] = useState([
    {
      nombre: "Placeholder",
      ingredientes: ["", ""],
    },
  ]);

  useEffect(() => {
    const fetchDetailsRecipe = async () => {
      try {
        const response = await handleRequest("GET", "/recipe?id=" + id);
        setDetailsRecipe(response); // No se necesita ninguna transformación adicional
        console.log(session);
        console.log(detailsRecipe);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };

    fetchDetailsRecipe();
  }, []);

  useEffect(() => {
    const verifySession = async () => {
      try {
        if (await checkSession()) {
          console.log("Estás logeado");
        } else {
          const apiURL = "http://localhost:5173/";
          const response = await fetch(apiURL);
        }
      } catch (error) {
        console.error("Verify process error: ", error);
      }
    };

    verifySession();
  }, []);

  return (
    <>
      <NavBar />
      <div className={style.recipeContainer}>
        <div className={style.recipeInfo}>
          <div className={style.recipeHeader}>
            <h1>{detailsRecipe[0].nombre}</h1>
            <div className={style.recipeHeader}>
              <BiUserCircle size={60} />
              <span>@{detailsRecipe[0].username}</span>
              <BiBookmarkAlt
                color="#f6ae2d"
                size={55}
                style={{ marginInline: "5%" }}
              />
              <BiPlusCircle size={55} style={{ marginInlineStart: "5%" }} />
            </div>
          </div>
          <div className={style.recipeData}>
            <img
              src={detailsRecipe[0].url_minatura}
              placeholder="Imagen de Receta"
            ></img>
            <div className={style.abtRecipe}>
              <div className={style.catRecipe}>
                <div
                  style={{ marginInlineStart: "10%" }}
                  className={style.catItem}
                >
                  <BiTime size={30} />
                  <span>{detailsRecipe[0].tiempo} minutos</span>
                </div>
                <div className={style.catItem}>
                  <BiWorld size={30} />
                  <span>{detailsRecipe[0].pais}</span>
                </div>
                <div className={style.catItem}>
                  <MdDinnerDining size={30} />
                  <span>{detailsRecipe[0].categoria}</span>
                </div>
                <div
                  style={{ marginInlineEnd: "10%" }}
                  className={style.catItem}
                >
                  <GiAsparagus size={30} />
                  <span>Ingredientes</span>
                </div>
              </div>
              <div className={style.ingList}>
                <div
                  style={{ marginInlineEnd: "10%" }}
                  className={style.catItem}
                >
                  <GiAsparagus size={20} style={{ marginInlineEnd: "0.5%" }} />
                  <span>Ingredientes: </span>
                </div>
                <ul>
                  {detailsRecipe[0].ingredientes.map((value) => {
                    return (
                      <li key={value[1]}>
                        {value[1]} de {value[0]}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={style.descRecipe}>
                <span>{detailsRecipe[0].descripcion}</span>
              </div>
            </div>
          </div>
          {detailsRecipe.map((value, index) => {
            return (
              <>
                <div className={style.step}>
                  <h1>Paso {index+1}</h1>
                  <div className={style.stepItem}>
                    <img
                      src={value.multimedia_url_paso}
                      alt="Imagen de receta"
                    />
                    <span>
                      {value.descripcion_paso}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Recipe;
