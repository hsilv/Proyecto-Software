import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ProfileNav from "../../components/ProfileNav/ProfileNav";
import RecipePreview from "../../components/RecipePreview/RecipePreview"
import style from "./Profile.module.css";
import { SessionContext } from "../../context/sessionContext";
import { useParams, useNavigate } from "react-router-dom"
import { useAPI } from '../../hooks/useAPI'

function Profile() {
  const [ selected, setSelected ] = useState(1);
  const { checkSession } = useContext(SessionContext);
  const [ userInfo, setUserInfo ] = useState([]);
  const [ userRecipes, setUserRecipes ] = useState([]);
  const { fetchAPI } = useAPI();
  let { username } = useParams();
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
    checkSession();
  }, []);

  useEffect(() => {
    if(username){
        const fetchUserData = async () => {
            try {
                const res = await fetchAPI({
                    method: 'GET',
                    route: `user?id=${username}`,
                    body: null,
                    log: true,
                    showReply: true,
                });
                setUserInfo(res.data[0]);
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        }
        const fetchUserRecipes = async () => {
          try {
            const res = await fetchAPI({
              method: 'GET',
              route: `recipe/byUser?username=${username}`,
              body: null,
              log: true,
              showReply: true,
            });
            setUserRecipes(res.data);
          } catch ( error ) {
            console.error("Error fetching user recipes: ", error);
          }
        }
        fetchUserData();
        fetchUserRecipes();
        console.log(userRecipes);
    }
  }, []);

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
    </>
  );
}

export default Profile;
