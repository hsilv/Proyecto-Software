import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

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