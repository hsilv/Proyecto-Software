import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import Profile from './pages/Profile/Profile'

function App() {
  let component
  console.log(window.location.pathname)
  switch (window.location.pathname) {
    case '/Login':
      component = <Login />
      break

    case '/Home':
      component = <Home />
      break

    case '/SignUp':
      component = <SignUp />
      break

    default:
      /* pido mis más sinceras disculpas de antemano, pero si me pongo a usar react router le explotan las rutas a todos */
      /* (creo) (prevenir > lamentar) */
      /* solo es para mostrar funcionalidad en el sprint */
      if (window.location.pathname.slice(0, 8) === '/profile') {
        component = <Profile username={`${window.location.pathname.slice(9)}`} />
      } else {
        component = <Login />
      }
      break
  }

  return <div className="App">{component}</div>
}

export default App
