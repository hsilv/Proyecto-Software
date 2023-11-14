/* import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Recipe from "../pages/Recipe/Recipe";
import SignUp from "../pages/SignUp/SignUp";
import Profile from "../pages/Profile/Profile";
import ProfileView from "../pages/Profile/ProfileView";
import SearchPage from "../pages/Search/SearchPage";
import CreateRecipe from "../pages/CreateRecipe/CreateRecipe";
import Page404 from "../pages/Page404"; */
import { useContext } from "react";
import { SessionContext } from "../context/sessionContext";
import { LoggedRoutes } from "./loggedRoutes";
import { UnloggedRoutes } from "./unLoggedRoutes";

function MainRoutes() {
  const { userInfo, logged } = useContext(SessionContext);
  return userInfo || logged ? <LoggedRoutes /> : <UnloggedRoutes />;
}

export { MainRoutes };
