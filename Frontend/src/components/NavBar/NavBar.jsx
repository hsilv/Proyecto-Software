import "./NavBar.css";
import useSession, { handleLogOut } from "../../hooks/session";
import AnyButton from "../AnyButton/AnyButton";
import logo from "/assets/Vector.png";
import { BiBell, BiLogOut, BiPlusCircle, BiSearch, BiUserCircle } from "react-icons/bi";
import IconButton from "../IconButton/IconButton";

const NavBar = () => {
  const {getUser} = useSession();
  return (
    <div className="NavBar">
      <div className="logoContainer">
        <a href="/home">
          <img src={logo} className="logo"></img>
          CookApp
        </a>
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
        <IconButton onClick={() => {getUser().then(data => window.location.replace("/profile?username="+data))}} classes={["p-i-medium"]}>
            <BiUserCircle/>
        </IconButton>
        
      </div>
    </div>
  );
};

export default NavBar;
