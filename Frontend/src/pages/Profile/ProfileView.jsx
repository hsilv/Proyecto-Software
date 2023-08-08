import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ProfileNav from "../../components/ProfileNav/ProfileNav";
import style from "./Profile.module.css";
import Edit from "/assets/edit-btn.svg";
import Button from "../../components/Button/Button";
import { SessionContext } from "../../context/sessionContext";

function Profile() {
  const [selected, setSelected] = useState(1);
  const { checkSession } = useContext(SessionContext);
  const [ userInfo, setUserInfo ] = useState([]);
  let {username} = useParams();
  const navigate = useNavigate();

  const showCurrent = () => {
    let currentStr;
    if (selected === 1) {
      currentStr = "Recetas";
    } else if (selected === 2) {
      currentStr = "Favoritos";
    } else {
      currentStr = "Colecciones";
    }
    return <span>{`${currentStr} de ${userInfo ? userInfo.username : ''}`}</span>;
  };

  useEffect(() => {
    if(id){
        const fetchUserData = async () => {
            try {
                const res = await fetchAPI({
                    method: 'GET',
                    route: `user?id=${username}`,
                    body: null,
                    log: true,
                    showReply: true,
                })
                setUserInfo(res.data);
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        }
        fetchUserData();
    }
  }, []);

  const loadInfo = () => {
      return (
        <>
          <button className={style.editBtn} onClick={() => setEditMode(true)}>
            <img src={Edit} />
          </button>
          <span className={style.realName}>{userInfo ? userInfo.nombre : 'Nombre'}</span>
          <span className={style.username}>@{userInfo ? userInfo.username : ''}</span>
          <span className={style.username}>Followers: {userInfo ? userInfo.followers : '0'}</span>
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
