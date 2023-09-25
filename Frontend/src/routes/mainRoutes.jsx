import { useRoutes } from "react-router-dom"
import Login from "../pages/Login/Login"
import Home from "../pages/Home/Home"
import Recipe from "../pages/Recipe/Recipe"
import SignUp from "../pages/SignUp/SignUp"
import Profile from "../pages/Profile/Profile"
import ProfileView from '../pages/Profile/ProfileView'
import SearchPage from "../pages/Search/SearchPage"

const MainRoutes = () => {

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