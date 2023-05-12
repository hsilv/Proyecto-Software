import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'

function App() {
    let component
    console.log(window.location.pathname)
    switch (window.location.pathname) {
        case '/Login':
            component = <Login/>
            break
    
        case '/Home':
            component = <Home/>
            break

        case '/SignUp':
            component = <SignUp/>
        break

        default:
            component = <Login/>
            break
    }

    return (
        <div className='App'>
            {component}
        </div>
    )
}

export default App