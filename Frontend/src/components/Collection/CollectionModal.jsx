import { useEffect, useState } from "react";
import styles from "./CollectionModal.module.scss";
import { CgClose } from "react-icons/cg";
import { useAPI } from "../../hooks/useAPI";
import RecipePreview from "../RecipePreview/RecipePreview";
import CollectionRecipe from "./CollectionRecipe";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

export default function CollectionModal({ id, showModal, closer }) {
  /*   const [transStyles, setTransStyles] = useState(false); */
  const [collectionName, setCollectionName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recipes, setRecipes] = useState([]);
  const { fetchAPI } = useAPI();
  const navigate = useNavigate();

  /*   useEffect(() => {
    if (showModal) {
      setTimeout(() => setTransStyles(true), 50);
    }
  }, [showModal]); */

  /*   const closeModal = () => {
    closer(false);
  }; */

  const onRecipeClick = (id) => {
    navigate(`/Recipe/${id}`);
  };

  useEffect(() => {
    if (id) {
      const fetchRecipes = async () => {
        try {
          const res = await fetchAPI({
            method: "GET",
            route: `collections/allRecipes?id=${id}`,
            body: null,
            log: true,
            showReply: true,
          });
          setRecipes(res);
        } catch (error) {
          console.error("Error fetching user collections: ", error);
        }
      };
      fetchRecipes();
    }
  }, [id]);

  useEffect(() => {
    if (recipes) {
      if (recipes.status) {
        setCollectionName(recipes.name);
        setErrorMessage(recipes.message);
      } else {
        recipes.forEach((value) => {
          setCollectionName(value.coleccion.nombre);
        });
      }
    }
  }, [recipes]);

  return (
    <Modal title={collectionName} setCloseState={closer} show={showModal}>
      <div className={styles.modalBody}>
        {recipes.status ? (
          <span className={styles.errorMessage}>{errorMessage}</span>
        ) : (
          recipes.map((value, index) => {
            return (
              <CollectionRecipe
                key={value + index}
                recipe={value.receta}
                onClick={onRecipeClick}
              />
            );
          })
        )}
      </div>
    </Modal>
  );
}
