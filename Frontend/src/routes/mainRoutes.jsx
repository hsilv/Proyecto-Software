import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Recipe from "../pages/Recipe/Recipe";
import SignUp from "../pages/SignUp/SignUp";
import Profile from "../pages/Profile/Profile";
import ProfileView from "../pages/Profile/ProfileView";
import SearchPage from "../pages/Search/SearchPage";
import CreateRecipe from "../pages/CreateRecipe/CreateRecipe";

const MainRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <SignUp /> },
    { path: "/Home", element: <Home /> },
    { path: "/Recipe/:id", element: <Recipe /> },
    { path: "/Profile", element: <Profile /> },
    { path: "/SearchPage/:search", element: <SearchPage /> },
    { path: "/Profile/:username", element: <ProfileView /> },
    { path: "/CreateRecipe", element: <CreateRecipe /> },
  ]);

  return routes;
};

export { MainRoutes };
