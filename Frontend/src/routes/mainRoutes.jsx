import { useRoutes } from "react-router-dom"
import Login from "../pages/Login/Login"
import Home from "../pages/Home/Home"
import Recipe from "../pages/Recipe/Recipe"
import SignUp from "../pages/SignUp/SignUp"
import Profile from "../pages/Profile/Profile"
import ProfileView from '../pages/Profile/ProfileView'
import SearchPage from "../pages/Search/SearchPage"
import { useContext } from "react"
import { NavContext } from "../context/navContext"

const MainRoutes = () => {

    const{ show } = useContext(NavContext);

    const contentStyle = {
        marginTop: show ? "80px" : "0", // Margen igual a la altura del Navbar si se muestra, 0 si está oculto
    };

    let routes = useRoutes([
        { path: "/", element: <Login style={contentStyle} /> },
        { path: "/Home", element: <Home style={contentStyle} /> },
        { path: "/Recipe/:id", element: <Recipe style={contentStyle} /> },
        { path: "/SignUp", element: <SignUp style={contentStyle} /> },
        { path: "/Profile", element: <Profile style={contentStyle} /> },
        { path: "/SearchPage/:search", element: <SearchPage style={contentStyle} /> },
        { path: "/Profile/:username", element: <ProfileView style={contentStyle} /> },
      ]);
    
      return routes;
    };


export {MainRoutes};