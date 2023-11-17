/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import style from './Profile.module.css';
import UserProfile from '../../components/UserProfile/userProfile';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserByID } from '../../hooks/api/useUserByID';
import { useCollectionsByUser } from '../../hooks/api/useCollectionsByUser';
import { useRecipesByUser } from '../../hooks/api/useRecipesByUser';
import RecipePreview from '../../components/RecipePreview/RecipePreview';
import Collection from '../../components/Collection/Collection';
import Modal from '../../components/Modal/Modal';
import CollectionModal from '../../components/Collection/CollectionModal';
import Loading from '../../components/Loading';
import { SessionContext } from '../../context/sessionContext';

function Profile() {
  const { checkSession, userInfo, loading } = useContext(SessionContext);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(1); 
  const [selectedCollection, setSelectedCollection] = useState();
  const { username } = useParams();
  const navigate = useNavigate();
  const { resultUserByID: userVInfo, getUserByID } = useUserByID();
  const { getCollectionsByUser, resultCollectionsByUser: userCollections, loading: loadingCollectionsByUser } = useCollectionsByUser();
  const { getRecipesByUser, resultRecipesByUser: userRecipes, loading: loadingRecipesByUser } = useRecipesByUser();

  const collectionClickHandler = (id) => {
    setShowModal(true);
    setSelectedCollection(id);
  };

  const showCurrent = () => {
    if (selected === 1) {
      if (userRecipes && userRecipes.length > 0) {
        return userRecipes.map((recipe, x) => (
          <RecipePreview recipe={recipe} callback={collectionClickHandler} key={x} />
        ));
      } else {
        return <span className={style.noData}>This user hasn't uploaded any recipes.</span>;
      }
    } else if (selected === 2) {
      return <span className={style.noData}>This user hasn't liked any recipes.</span>;
    } else {
      if (userCollections && !userCollections.message) {
        return userCollections.map((collection, index) => (
          <Collection
            key={index + collection}
            name={collection.nombre}
            className={style.collectionPreview}
            onClick={() => collectionClickHandler(collection.id)}
          />
        ));
      } else {
        return <span className={style.noData}>This user doesn't have collections.</span>;
      }
    }
  };

  useEffect(() => {
    checkSession();
    if (username) {
      getUserByID(username);
      getRecipesByUser(username);
    }
  }, []);

  useEffect(() => {
    if (userInfo.username === username) navigate('/profile', { replace: true });
    if (userVInfo.id) getCollectionsByUser(userVInfo.id);
  }, [userInfo]);

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.userInfoContainer}>
          <UserProfile userVInfo={userVInfo} userInfo={userInfo} />
        </div>
        <div className={style.recipesContainer}>
          <ProfileNav active={selected} callback={setSelected} />
          <div className={style.recipeViewer}>{showCurrent()}</div>
        </div>
        <Modal show={showModal}>
          <CollectionModal id={selectedCollection} showModal={showModal} closer={setShowModal} />
        </Modal>
        <Loading loading={loading && loadingCollectionsByUser && loadingRecipesByUser} />
      </div>
    </>
  );
}

export default Profile;
