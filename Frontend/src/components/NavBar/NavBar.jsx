/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useCallback, useState } from "react";
import { TbChefHat, TbBell, TbSquareRoundedPlus, TbUser } from "react-icons/tb";
import { SessionContext } from "../../context/sessionContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useNotifications } from "../../hooks/api/useNotifications";
import SearchBar from "../SearchBar/Searchbar";
import Notifications from "../Notifications/Notifications"
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { logOut, logged, checkSession, loading, userInfo } = useContext(SessionContext);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentDropdown, setCurrentDropdown] = useState(' ');
  const {resultNotifications: notifications, getNotifications, deleteNotification} = useNotifications();

  useEffect(() => {
      getNotifications(userInfo?.idUser);
    }, [userInfo]);


  const handleSearchChange = ( value ) => {
    setSearchKeyword(value);
  };

  const handleSearch = () => {
    console.log("Search triggered:", searchKeyword);
    if(searchKeyword){
      navigate("/SearchPage/" + searchKeyword);
    }
  };

  const delNotificationCallback = ( id ) => {
    deleteNotification(id);
  }

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

  const toggleDropdown = ( type ) => {
    setCurrentDropdown( currentDropdown !== type ? type : ' ');
  };

  return (
    <div className={styles.NavbarContainer}>
          <NavLink className={styles.LeftAlignedContent} to={"/"}>
            <TbChefHat style={{marginRight:'5px'}} fontSize={'24px'} />
            CookApp
          </NavLink>
          <SearchBar
            keyword={searchKeyword}
            onChange={handleSearchChange}
            onSearch={handleSearch}
          />

          <div className={styles.icons}>

            <div className={styles.userIcon} onClick={() => toggleDropdown('notifications')}>
              <TbBell />
              {currentDropdown === 'notifications' && notifications && (
                <Notifications notifications={notifications} callback={delNotificationCallback}/>
              )}
            </div>
            
            <div className={styles.userIcon} onClick={() => navigate('/CreateRecipe')}>
              <TbSquareRoundedPlus />
            </div>

            <div className={styles.userIcon} onClick={() => toggleDropdown('profile')}>
              <TbUser />
              {currentDropdown === 'profile' && (
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