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
        setDetailsRecipe(res.data[0]);
        //console.log(res.data[0].usuario.username)
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
            {<h1>{detailsRecipe.nombre}</h1>}
            <div className={style.recipeHeader}>
              <BiUserCircle size={60} />
              {<span className="userLink">@{detailsRecipe.usuario?.username}</span>}
              <BiBookmarkAlt
                color="#f6ae2d"
                size={55}
                style={{ marginInline: "5%" }}
              />
              <BiPlusCircle size={55} />
            </div>
          </div>
          <div className={style.recipeData}>
            <img
              src={detailsRecipe.miniatura && detailsRecipe.miniatura[0]?.url ? detailsRecipe.miniatura[0]?.url : 'https://fakeimg.pl/1920x1080/35356e'}
              placeholder="Imagen de Receta"
            ></img>
            <div className={style.abtRecipe}>
              <div className={style.catRecipe}>
                <div className={style.catItem}>
                  <BiTime size={30} />
                  {<span className="categoryHeader">{detailsRecipe.tiempo} minutos</span>}
                </div>
                <div className={style.catItem}>
                  <BiWorld size={30} />
                  {<span>{detailsRecipe.pais}</span>}
                </div>
                <div className={style.catItem}>
                  <MdDinnerDining size={30} />
                  {<span>{detailsRecipe.categoria?.categoria}</span>}
                </div>
                
              </div>
              <div className={style.ingList}>
                <div
                  style={{ marginInlineEnd: "10%" }}
                  className={style.catItem}
                >
                  <GiAsparagus size={30} style={{ marginInlineEnd: "0.5%" }} />
                  <span>Ingredientes: </span>
                </div>
                <ul>
                  {detailsRecipe.ingredientes?.map((value, x) => {
                    return (
                      <li key={x}>
                        {value.split(",")[0].slice(1)} - {value.split(",")[1].slice(0, -1)}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={style.descRecipe}>
                {<span>{detailsRecipe.descripcion}</span>}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Recipe;
