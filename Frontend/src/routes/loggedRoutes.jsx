import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Recipe from "../pages/Recipe/Recipe";
import Profile from "../pages/Profile/Profile";
import ProfileView from "../pages/Profile/ProfileView";
import SearchPage from "../pages/Search/SearchPage";
import CreateRecipe from "../pages/CreateRecipe/CreateRecipe";
import Page404 from "../pages/Page404";
import NavBar from "../components/NavBar/NavBar";

function LoggedRoutes() {
   return(
    <>
    <NavBar />
    <Routes>
        <Route path="/Home" element={<Navigate to={'/'}/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/Recipe/:id" element={<Recipe />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SearchPage/:search" element={<SearchPage />} />
        <Route path="/Profile/:username" element={<ProfileView />} />
        <Route path="/CreateRecipe" element={<CreateRecipe />} />
        <Route path="*" element={<Page404 />} />
    </Routes>
    </>
   ) 
}

export { LoggedRoutes };
