/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
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
import { useAPI } from "../../hooks/useAPI";
import { useNotifications } from "../../hooks/api/useNotifications";

function Profile() {
  const { fetchAPI } = useAPI();
  const [ selected, setSelected ] = useState(1);
  const [ isUserFollowing, setIsUserFollowing ] = useState(false);
  const { checkSession, userInfo} = useContext(SessionContext);
  const {getRecipesByUser, resultRecipesByUser: userRecipes} = useRecipesByUser();
  const [showModal, setShowModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState();
  let { username } = useParams();
  const navigate = useNavigate();
  const {resultUserByID: userVInfo, getUserByID} = useUserByID();
  const {getCollectionsByUser, resultCollectionsByUser: userCollections} = useCollectionsByUser();
  const {postNotification} = useNotifications();

  const recipeClickHandler = (recipeID) => {
    navigate('/Recipe/' + recipeID);
  }

  const isFollowing = async () => {
    const res = await fetchAPI({
      method: 'GET',
      route: `user/isFollowing?uID=${userInfo.idUser}&fID=${userVInfo.id}`,
      body: null,
      log: true,
      showReply: true,
    });

    setIsUserFollowing(res.length);
  }

  const toggleFollow = async () => {

    if(!isUserFollowing) {
      const res = await fetchAPI({
        method: 'POST',
        route: 'user/follow',
        body: JSON.stringify({
            uID: userInfo.idUser,
            fID: userVInfo.id,
        }),
        log: false,
        showReply: false,
      });
  
      if(res) {
          if(res.error){
            console.log(res);
          } else {
            setIsUserFollowing(!isUserFollowing);
          }
      }

      // TODO: Actualmente, se pueden spammear estas notificaciones modo insano.
      // Se debe revisar si ya existe una notificacion igual antes de llamar esto (o evitar entradas repetidas en la mera base de datos)
      postNotification(`${userInfo.username} is now following you <3`, userVInfo.id, userInfo.idUser, null);

    } else {
      const res = await fetchAPI({
        method: 'DELETE',
        route: 'user/unfollow',
        body: JSON.stringify({
          uID: userInfo.idUser,
          fID: userVInfo.id,
        }),
        log: false,
        showReply: false,
      });

      if(res) {
        if(res.error){
          console.log(res);
        } else {
          setIsUserFollowing(!isUserFollowing);
        }
      }

    }

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
          <span className={style.noData}>{userVInfo.username} no ha publicado recetas</span>
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
            {userVInfo.username} no tiene colecciones
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
    if (userInfo.username === username) navigate('/profile', { replace: true });
    if (userVInfo.id) getCollectionsByUser(userVInfo.id);
  },[userInfo]);

  useEffect(() => {
    if(userInfo.idUser && userVInfo.id) isFollowing();
  }, [userInfo, userVInfo]);

  const loadInfo = () => {
      return (
        <>
          <span className={style.realName}>{userVInfo ? userVInfo?.nombre : 'Nombre'}</span>
          <span className={style.username}>@{userVInfo ? userVInfo?.username : ''}</span>
          <button className={style.followBtn} onClick={toggleFollow}>{isUserFollowing ? 'Unfollow' : 'Follow'}</button>
          <span className={style.username}>Followers: {userVInfo ? userVInfo?.followers : '0'}</span>
          <p className={style.desc}>descripcion</p>
        </>
      );
  };

  return (
    <>
      <div className={style.profileWrapper}>
        <div className={style.infoContainer}>
          <img
            className={style.pfp}
            src={`https://fakeimg.pl/400x400/f26fb7/ffffff?text=${userVInfo.username}`}
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
