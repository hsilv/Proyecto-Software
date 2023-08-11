import React, { useContext, useEffect, useCallback } from "react";
import { BsBell, BsPlusCircle, BsFillPersonFill} from "react-icons/bs";
import { SessionContext } from "../../context/sessionContext";
import { Navigate, useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar/Searchbar';
import { useState } from "react";
import styles from './Navbar.module.css';

const NavBar = () => {
  const { logOut, logged } = useContext(SessionContext);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handleEnter = () => {
    console.log("Search triggered:", searchKeyword);
    navigate('/SearchPage/' + searchKeyword)
  };

  useEffect(() => {
    if (!logged) {
      navigate('/');
    }
  }, [logged]);

  const handleLogOut = useCallback(() => {
    logOut();
  }, [logOut]);

  return (
    <div className={styles.NavbarContainer}>
      <div className={styles.LeftAlignedContent}>
        CookingApp
      </div>
        <SearchBar
          keyword={searchKeyword}
          onChange={handleSearchChange}
          onEnter={handleEnter}
        />
      <div className={styles.icons}>
        <BsBell />
        <BsPlusCircle />
        <BsFillPersonFill onClick={() => {navigate('/Profile')}} />
      </div>
    </div>
  );
};

export default NavBar;
