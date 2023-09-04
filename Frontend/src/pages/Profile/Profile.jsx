import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ProfileNav from "../../components/ProfileNav/ProfileNav";
import style from "./Profile.module.css";
import Edit from "/assets/edit-btn.svg";
import Button from "../../components/Button/Button";
import { SessionContext } from "../../context/sessionContext";
import RecipePreview from "../../components/RecipePreview/RecipePreview"
import { useNavigate } from "react-router-dom"
import { useAPI } from '../../hooks/useAPI'

function Profile() {
  const [selected, setSelected] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState(["", ""]);
  const { userInfo } = useContext(SessionContext);
  const [ userRecipes, setUserRecipes ] = useState([]);
  const { fetchAPI } = useAPI();
  const navigate = useNavigate();

  const recipeClickHandler = (recipeID) => {
    navigate('/Recipe/'+recipeID)
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
      return (
        <span className={style.noData}>Colecciones</span>
      )
    }
  };

  useEffect(() => {
    if(userInfo.username){
        const fetchUserRecipes = async () => {
          try {
            const res = await fetchAPI({
              method: 'GET',
              route: `recipe/byUser?username=${userInfo.username}`,
              body: null,
              log: true,
              showReply: true,
            });
            setUserRecipes(res.data);
          } catch ( error ) {
            console.error("Error fetching user recipes: ", error);
          }
        }
        fetchUserRecipes();
    }
  }, []);

  const handleNameChange = (event) => {
    setEditedValues([event.target.value, editedValues[1]]);
  };

  const handleDescChange = (event) => {
    setEditedValues([editedValues[0], event.target.value]);
  };

  useEffect(() => {
    console.table(userInfo);
  }, [userInfo]);

  /* const handleConfirm = async (name, desc) => {
    if (name === '' && data[3] !== '') {
      name = data[3]
    }
    if (desc === '' && data[4] !== '') {
      desc = data[4]
    }
    const response = await handleRequest('POST', '/updateUserData', {
      username,
      name,
      desc,
    })
    getUserData(username)
    setEditMode(false)
    setEditedValues(['', ''])
  } */

  const handleCancel = () => {
    setEditMode(false);
    setEditedValues(["", ""]);
  };

  const loadInfo = () => {
    if (!editMode) {
      return (
        <>
          <button className={style.editBtn} onClick={() => setEditMode(true)}>
            <img src={Edit} />
          </button>
          <span className={style.realName}>{userInfo ? userInfo.username : 'Nombre'}</span>
          <span className={style.username}>@{userInfo ? userInfo.username : ''}</span>
          <span className={style.username}>Followers: {userInfo ? userInfo.followers : '0'}</span>
          <p className={style.desc}>descripcion</p>
        </>
      );
    } else {
      return (
        <>
          <input
            type="text"
            defaultValue={userInfo ? userInfo.username : ''}
            placeholder="Nombre"
            maxLength={50}
            className="editInput"
            onChange={handleNameChange}
          />
          <span className={style.username}>@{userInfo ? userInfo.username : ''}</span>
          <span className={style.username}>Followers: {userInfo ? userInfo.followers : '0'}</span>
          <textarea
            rows={6}
            type="text"
            defaultValue={''} 
            placeholder="Descripción"
            maxLength={200}
            className="editInput Desc"
            onChange={handleDescChange}
          />
          <button
            className={style.formBtn}
            /* onClick={() => handleConfirm(editedValues[0], editedValues[1])} */
            /* disabled={
              (editedValues[0] === data[3] && editedValues[1] === data[4]) ||
              editedValues[0].length > 50 ||
              editedValues[1].length > 200
            } */
          >
            Confirmar cambios
          </button>
          <button onClick={handleCancel} className={style.formBtnSecondary}>
            Cancelar
          </button>
        </>
      );
    }
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
    </>
  );
}

export default Profile;
