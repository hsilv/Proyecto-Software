/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useCallback } from "react";
import { BsBell, BsPlusCircle, BsFillPersonFill } from "react-icons/bs";
import { SessionContext } from "../../context/sessionContext";
import { TbLogout } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import { useState } from "react";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { logOut, logged, checkSession, loading } = useContext(SessionContext);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handleEnter = () => {
    console.log("Search triggered:", searchKeyword);
    navigate("/SearchPage/" + searchKeyword);
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if(checked === 3){
      if (!logged) {
        navigate("/");
      }
    }
  }, [logged, checked]);

  useEffect(() => {
    setChecked(checked + 1);
  }, [loading]);

  const handleLogOut = useCallback(() => {
    logOut();
  }, [logOut]);

  // botón de logout pendiente

  return (
    <div className={styles.NavbarContainer}>
      <NavLink className={styles.LeftAlignedContent} to={"/Home"}>
        CookApp
      </NavLink>
      <SearchBar
        keyword={searchKeyword}
        onChange={handleSearchChange}
        onEnter={handleEnter}
      />
      <div className={styles.icons}>
        <BsBell />
        <BsPlusCircle />
        <NavLink to={"/Profile"} className={styles.link}>
          <BsFillPersonFill />
        </NavLink>
        <TbLogout onClick={handleLogOut} />
      </div>
    </div>
  );
};

export default NavBar;
