import React, { useEffect, useState, useContext } from "react";
import NavBar from "../../components/NavBar/NavBar";
import style from "./Recipe.module.css";
import { BiBookmarkAlt, BiWorld } from "react-icons/bi";
import { BiPlusCircle, BiUserCircle, BiTime } from "react-icons/bi";
import { GiAsparagus } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";
import { useAPI } from "../../hooks/useAPI";
import { SessionContext } from "../../context/sessionContext";
import { useParams } from "react-router-dom"

function Recipe() {
  const { checkSession } = useContext(SessionContext);
  const { fetchAPI } = useAPI();
  let {id} = useParams();
  const [detailsRecipe, setDetailsRecipe] = useState([
    {
      nombre: "Placeholder",
      ingredientes: ["", ""],
    },
  ]);

  useEffect(() => {
    const fetchDetailsRecipe = async () => {
      try {
        console.log(id)
        const res = await fetchAPI({
          method: 'GET',
          route: `recipe?id=${id}`,
          body: null,
          log: true,
          showReply: true,
        });
        setDetailsRecipe(res.data); // No se necesita ninguna transformación adicional
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };

    fetchDetailsRecipe();

  }, []);

  useEffect(() => {
    /* const verifySession = async () => {
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

    verifySession(); */
  }, []);

  return (
    <>
      <NavBar />
      <div className={style.recipeContainer}>
        <div className={style.recipeInfo}>
          <div className={style.recipeHeader}>
            {<h1>{detailsRecipe[0]?.nombre}</h1>}
            <div className={style.recipeHeader}>
              <BiUserCircle size={60} />
              {<span className="userLink">@{detailsRecipe[0]?.usuario}</span>}
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
              src={detailsRecipe.miniatura[0] ? detailsRecipe[0]?.miniatura[0].url : 'https://fakeimg.pl/1920x1080/ff0000'}
              placeholder="Imagen de Receta"
            ></img>
            <div className={style.abtRecipe}>
              <div className={style.catRecipe}>
                <div
                  style={{ marginInlineStart: "10%" }}
                  className={style.catItem}
                >
                  <BiTime size={30} />
                  {<span>{detailsRecipe[0]?.tiempo} minutos</span>}
                </div>
                <div className={style.catItem}>
                  <BiWorld size={30} />
                  {/* <span>{detailsRecipe[0].pais}</span> */}
                </div>
                <div className={style.catItem}>
                  <MdDinnerDining size={30} />
                  {<span>{detailsRecipe[0]?.categoria}</span>}
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
                      <li>
                        {value?.split(",")[0].slice(1)} - {value?.split(",")[1].slice(0, -1)}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={style.descRecipe}>
                {<span>{detailsRecipe[0].descripcion}</span>}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Recipe;
