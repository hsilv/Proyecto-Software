import NavBar from "../../components/NavBar/NavBar";
import style from "./Recipe.module.css";
import { BiBookmarkAlt, BiWorld } from "react-icons/bi";
import { BiPlusCircle, BiUserCircle, BiTime } from "react-icons/bi";
import { GiAsparagus } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";

function Recipe({ id }) {
  return (
    <>
      <NavBar />
      <div className={style.recipeContainer}>
        <div className={style.recipeInfo}>
          <div className={style.recipeHeader}>
            <h1>Nombre de la receta: ({id})</h1>
            <div className={style.recipeHeader}>
              <BiUserCircle size={60} />
              <span>@Usuario</span>
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
              src="https://th.bing.com/th/id/OIP.qIMMSQJ0Z4J86BJSoQ8aLAHaFi?pid=ImgDet&rs=1"
              placeholder="Imagen de Receta"
            ></img>
            <div className={style.abtRecipe}>
              <div className={style.catRecipe}>
                <div
                  style={{ marginInlineStart: "10%" }}
                  className={style.catItem}
                >
                  <BiTime size={30} />
                  <span>Tiempo</span>
                </div>
                <div className={style.catItem}>
                  <BiWorld size={30} />
                  <span>Geography</span>
                </div>
                <div className={style.catItem}>
                  <MdDinnerDining size={30} />
                  <span>Category</span>
                </div>
                <div
                  style={{ marginInlineEnd: "10%" }}
                  className={style.catItem}
                >
                  <GiAsparagus size={30} />
                  <span>Ingredients</span>
                </div>
              </div>
              <div className={style.ingList}>
                <span>Lista de Ingredientes:</span>
                <ul>
                  <li>Ingrediente 1</li>
                  <li>Ingrediente 1</li>
                  <li>Ingrediente 1</li>
                  <li>Ingrediente 1</li>
                  <li>Ingrediente 1</li>
                  <li>Ingrediente 1</li>
                  <li>Ingrediente 1</li>
                  <li>Ingrediente 1</li>
                </ul>
              </div>
              <div className={style.descRecipe}>
                <span>
                  Acá irá la descripción de la receta
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;
