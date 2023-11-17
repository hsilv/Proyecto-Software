import { useContext, useEffect, useState } from "react";
import ProfileNav from "../../components/ProfileNav/ProfileNav";
import style from "./Profile.module.css";
import Edit from "/assets/edit-btn.svg";
import { SessionContext } from "../../context/sessionContext";
import RecipePreview from "../../components/RecipePreview/RecipePreview";
import { useNavigate } from "react-router-dom";
import Collection from "../../components/Collection/Collection";
import Modal from "../../components/Modal/Modal";
import CollectionModal from "../../components/Collection/CollectionModal";
import { useRecipesByUser } from "../../hooks/api/useRecipesByUser";
import { useCollectionsByUser } from "../../hooks/api/useCollectionsByUser";

import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import Loading from "../../components/Loading";

function Profile() {
  const [selected, setSelected] = useState(1);
  const { userInfo, loading } = useContext(SessionContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState();
  const {getRecipesByUser, resultRecipesByUser: userRecipes, loadingRecipesByUser} = useRecipesByUser();
  const {getCollectionsByUser, resultCollectionsByUser: userCollections, loadingCollectionsByUser} = useCollectionsByUser();
  const navigate = useNavigate();

  const recipeClickHandler = (recipeID) => {
    navigate("/Recipe/" + recipeID);
  };

  const collectionClickHandler = (id) => {
    setShowModal(true);
    setSelectedCollection(id);
  }

  const showCurrent = () => {
    if (selected === 1) {
      if (userRecipes.length > 0) {
        return userRecipes.map((recipe, x) => {
          return (
            <RecipePreview
              recipe={recipe}
              callback={recipeClickHandler}
              key={x}
            />
          );
        });
      } else {
        return (
          <span className={style.noData}>
            This user hasn't uploaded any recipes.
          </span>
        );
      }
    } else if (selected === 2) {
      return <span className={style.noData}>This user hasn't liked any recipes.</span>;
    } else {
      if (userCollections && !userCollections.message) {
        return userCollections.map((collection, index) => {
          return (
            <Collection key={index+collection} name={collection.nombre} className={style.collectionPreview} onClick={() => collectionClickHandler(collection.id)}/>
          )
        })
      } else {
        return (
          <span className={style.noData}>
            This user doesn't have collections.
          </span>
        );
      }
    }
  };

  useEffect(() => {
    getRecipesByUser(userInfo.username);
    getCollectionsByUser(userInfo.idUser);
  }, []);

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.userInfoContainer}>
          <ProfileInfo/>
        </div>
        <div className={style.recipesContainer}>
          <ProfileNav active={selected} callback={setSelected} />
          <div className={style.recipeViewer}>{showCurrent()}</div>
        </div>
        <Modal show={showModal}>
        <CollectionModal id={selectedCollection} showModal={showModal} closer={setShowModal}/>
      </Modal>
      <Loading loading={loading && loadingCollectionsByUser && loadingRecipesByUser}/>
      </div>
    </>
  );
}

export default Profile;
