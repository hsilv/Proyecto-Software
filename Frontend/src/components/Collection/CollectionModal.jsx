import { useEffect, useState } from "react";
import styles from "./CollectionModal.module.scss";
import { CgClose } from "react-icons/cg";
import { useAPI } from "../../hooks/useAPI";

export default function CollectionModal({ id, showModal, closer }) {
  const [transStyles, setTransStyles] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recipes, setRecipes] = useState([]);
  const {fetchAPI} = useAPI();

  useEffect(() => {
    if (showModal) {
      setTimeout(() => setTransStyles(true), 50);
    }
  }, [showModal]);

  const closeModal = () => {
    closer(false);
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
  }, []);

  useEffect(() => {
    if(recipes){
        if(recipes.status){
            setCollectionName(recipes.name);
            setErrorMessage(recipes.message);
        } else {
            recipes.forEach((value) => {
                setCollectionName(value.coleccion.nombre);
            })
        }
    }
  }, [recipes])

  return (
    <div
      className={
        styles.collModal + " " + (transStyles ? styles.collShowed : undefined)
      }
    >
      <div
        className={
          styles.collBody +
          " " +
          (transStyles ? styles.collBodyShowed : undefined)
        }
      >
        <div className={styles.modalHeader}>
          <h2>{collectionName}</h2>
          <CgClose onClick={closeModal} className={styles.closeIcon} />
        </div>
        {recipes.status? <span className={styles.errorMessage}>{errorMessage}</span> : recipes.map((value) => {
            return value.receta.nombre
        })}
      </div>
    </div>
  );
}
