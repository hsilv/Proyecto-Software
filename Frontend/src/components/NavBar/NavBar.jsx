import "./NavBar.css";
/* import useSession, { handleLogOut } from "../../hooks/session"; */
import AnyButton from "../AnyButton/AnyButton";
import logo from "/assets/Vector.png";
import { BiBell, BiLogOut, BiPlusCircle, BiSearch, BiUserCircle } from "react-icons/bi";
import IconButton from "../IconButton/IconButton";
import { useCallback, useContext, useEffect } from "react";
import { SessionContext } from "../../context/sessionContext";
import { NavLink, useNavigate } from "react-router-dom";


const NavBar = () => {

  const {logOut, logged} = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!logged){
      navigate('/');
    }
  }, [logged]);

  const handleLogOut = useCallback(() => {
    logOut();
  }, [logOut]);

  return (
    <div className="NavBar">
      <div className="logoContainer">
        <NavLink to="/Home">
          <img src={logo} className="logo"></img>
          CookApp
        </NavLink>
      </div>
      <div className="searchContainer">
        <IconButton onClick={() => {console.log('Buscar')}} classes={["t-60"]}>
            <BiSearch/>
        </IconButton>


        <input placeholder="Busca algo :)" className="searchInput">
        </input>
      </div>
      <div className="userContainer">
      <IconButton onClick={() => {console.log("Agregar Receta")}} classes={["p-i-medium"]}>
            <BiPlusCircle/>
        </IconButton>
        <IconButton onClick={() => {console.log("Mostrar notificaciones")}} classes={["p-small", "p-i-medium"]}>
            <BiBell/>
        </IconButton>
        <IconButton onClick={handleLogOut} classes={["p-small", "p-i-medium"]}>
            <BiLogOut/>
        </IconButton>
        <IconButton  onClick={() => {navigate('/Profile')}} classes={["p-i-medium"]}>
            <BiUserCircle/>
        </IconButton>
        
      </div>
    </div>
  );
};

export default NavBar;
