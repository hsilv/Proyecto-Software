import { useRoutes, useSearchParams } from "react-router-dom"
import Login from "../pages/Login/Login"
import Home from "../pages/Home/Home"
import Recipe from "../pages/Recipe/Recipe"
import SignUp from "../pages/SignUp/SignUp"
import Profile from "../pages/Profile/Profile"
import ProfileView from '../pages/Profile/ProfileView'
import SearchPage from "../pages/Search/SearchPage"
import { useContext, useEffect, useState } from "react"
import { NavContext } from "../context/navContext"

const MainRoutes = () => {

    const{ show } = useContext(NavContext);

    let routes = useRoutes([
        {path: '/', element: <Login />},
        {path: '/Home', element: <Home />},
        {path: '/Recipe/:id', element: <Recipe />},
        {path: '/SignUp', element: <SignUp />},
        {path: '/Profile', element: <Profile />},
        {path: '/SearchPage/:search', element: <SearchPage />},
        {path: '/Profile/:username', element: <ProfileView />}
    ]);

    return routes;
}

export {MainRoutes};