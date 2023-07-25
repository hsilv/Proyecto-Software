import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import Profile from './pages/Profile/Profile'
import Recipe from './pages/Recipe/Recipe'

function App() {
  let component
  let params = new URLSearchParams(window.location.search);
  console.log(window.location.pathname);
  switch (window.location.pathname.toLowerCase()) {
    case '/login':
      component = <Login />
      break

    case '/home':
      component = <Home />
      break

    case '/signup':
      component = <SignUp />
      break
    
    case '/profile':
      component = <Profile username={`${params.get('username')}`} />
    break

    case '/recipe':
      component = <Recipe id={`${params.get('id')}`}/>
    break

    default:
      /* pido mis más sinceras disculpas de antemano, pero si me pongo a usar react router le explotan las rutas a todos */
      /* (creo) (prevenir > lamentar) */
      /* solo es para mostrar funcionalidad en el sprint */
      /* if (window.location.pathname.slice(0, 8) === '/profile') {
        component = <Profile username={`${params.get('username')}`} />
      } else { */
        component = <Login />
      /* } */
      break
  }

  return <div className="App">{component}</div>
}

export default App
