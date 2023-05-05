import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <img className='largeimg' src='./src/assets/img.png'></img>
    <Login />
  </React.StrictMode>,
)
