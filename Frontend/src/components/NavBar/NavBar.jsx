import "./NavBar.css";
import { handleLogOut } from "../../hooks/session";
import AnyButton from "../AnyButton/AnyButton";
import logo from "/assets/Vector.png";
import { BiSearch } from "react-icons/bi";

const NavBar = () => {
  return (
    <div className="NavBar">
      <div className="logoContainer">
        <a href="#">
          <img src={logo} className="logo"></img>
          CookApp
        </a>
      </div>
      <div className="searchContainer">
        <button onClick={() => {console.log('Buscar')}}>
            <BiSearch/>
        </button>
        <input placeholder="Busca algo :)" className="searchInput">
        </input>
      </div>
      <div>
        <AnyButton onClick={handleLogOut} classes={["left"]}>
          Cerrar Sesión
        </AnyButton>
      </div>
    </div>
  );
};

export default NavBar;
