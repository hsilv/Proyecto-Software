import { useContext, useEffect, useCallback, useState } from "react";
import { TbChefHat, TbBell, TbSquareRoundedPlus, TbUser } from "react-icons/tb";
import { SessionContext } from "../../context/sessionContext";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { logOut, logged, checkSession, loading } = useContext(SessionContext);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handleSearch = () => {
    console.log("Search triggered:", searchKeyword);
    if(searchKeyword){
      navigate("/SearchPage/" + searchKeyword);
    }
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

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };


  return (
    <div className={styles.NavbarContainer}>
      <NavLink className={styles.LeftAlignedContent} to={"/Home"}>
        <TbChefHat style={{marginRight:'5px'}} fontSize={'24px'} />
        CookApp
      </NavLink>
      <SearchBar
        keyword={searchKeyword}
        onChange={handleSearchChange}
        onSearch={handleSearch}
      />
      <div className={styles.icons}>
        <TbBell />
        <TbSquareRoundedPlus />
        <div className={styles.userIcon} onClick={toggleDropdown}>
          <TbUser />
          {isDropdownOpen && (
            <div className={styles.dropdownContent}>
              <NavLink className={styles.item} to="/profile">Profile</NavLink>
              <button className={styles.item} onClick={handleLogOut}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;