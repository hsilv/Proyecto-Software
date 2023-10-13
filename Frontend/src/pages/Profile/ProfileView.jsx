/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ProfileNav from "../../components/ProfileNav/ProfileNav";
import RecipePreview from "../../components/RecipePreview/RecipePreview"
import style from "./Profile.module.css";
import { SessionContext } from "../../context/sessionContext";
import { useParams, useNavigate } from "react-router-dom"
import Collection from "../../components/Collection/Collection";
import Modal from "../../components/Modal/Modal";
import CollectionModal from "../../components/Collection/CollectionModal";
import { useUserByID } from "../../hooks/api/useUserByID";
import { useCollectionsByUser } from "../../hooks/api/useCollectionsByUser";
import { useRecipesByUser } from "../../hooks/api/useRecipesByUser";

function Profile() {
  const [ selected, setSelected ] = useState(1);
  const { checkSession } = useContext(SessionContext);
  const {getRecipesByUser, resultRecipesByUser: userRecipes} = useRecipesByUser();
  const [showModal, setShowModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState();
  let { username } = useParams();
  const navigate = useNavigate();
  const {resultUserByID: userInfo, getUserByID} = useUserByID();
  const {getCollectionsByUser, resultCollectionsByUser: userCollections} = useCollectionsByUser();

  const recipeClickHandler = (recipeID) => {
    navigate('/Recipe/'+recipeID)
  }

  const collectionClickHandler = (id) => {
    setShowModal(true);
    setSelectedCollection(id);
  }

  const showCurrent = () => {
    if (selected === 1) {
      if(userRecipes.length > 0){
        return (
          userRecipes.map((recipe, x) => {
            return (
              <RecipePreview recipe={recipe} callback={recipeClickHandler} key={x}/>
            ) 
          }
        )
        )
      } else {
        return (
          <span className={style.noData}>{userInfo.username} no ha publicado recetas</span>
        )
      }
      
    } else if (selected === 2) {
      return (
        <span className={style.noData}>Favoritos</span>
      )
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
            {userInfo.username} no tiene colecciones
          </span>
        );
      }
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if(username){
        getUserByID(username)
        getRecipesByUser(username)
    }
  }, []);

  useEffect(() => {
    if (userInfo.id) getCollectionsByUser(userInfo.id);
  },[userInfo]);

  const loadInfo = () => {
      return (
        <>
          <span className={style.realName}>{userInfo ? userInfo?.nombre : 'Nombre'}</span>
          <span className={style.username}>@{userInfo ? userInfo?.username : ''}</span>
          <span className={style.username}>Followers: {userInfo ? userInfo?.followers : '0'}</span>
          <p className={style.desc}>descripcion</p>
        </>
      );
  };

  return (
    <>
      <NavBar />
      <div className={style.profileWrapper}>
        <div className={style.infoContainer}>
          <img
            className={style.pfp}
            src={`https://fakeimg.pl/400x400/f26fb7/ffffff?text=${userInfo.username}`}
          />
          {loadInfo()}
        </div>
        <div className={style.recipesContainer}>
          <ProfileNav active={selected} callback={setSelected} />
          <div className={style.recipeViewer}>{showCurrent()}</div>
        </div>
      </div>
      <Modal show={showModal}>
        <CollectionModal id={selectedCollection} showModal={showModal} closer={setShowModal}/>
      </Modal>
    </>
  );
}

export default Profile;
