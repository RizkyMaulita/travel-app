import React from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import checkLogin from "../utils/checkLogin"

export default function Navbar () {
  const { pathname } = useLocation()
  const history = useHistory()

  const activePath = (name) => {
    if (pathname.includes(name)) {
      return "nav-active"
    }
    return ""
  }

  const onLogout = () => {
    localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand mx-3" to="/">Travel</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse d-flex justify-content-end mx-3" id="navbarNav">
          {
            checkLogin()
            ? <ul className="navbar-nav">
                <li className={`nav-item mx-2 ${activePath('profile')}`}>
                  <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>
                </li>
                <li className={`nav-item mx-2`}>
                  <div style={{ cursor: 'pointer' }} onClick={() => onLogout()}>Logout</div>
                </li>
              </ul>
            : <ul className="navbar-nav">
                <li className={`nav-item mx-2 ${activePath('login')}`}>
                  <Link to="/login" style={{ textDecoration: 'none' , color: 'inherit' }}>Login</Link>
                </li>
                <li className={`nav-item mx-2 ${activePath('register')}`}>
                  <Link to="/register" style={{ textDecoration: 'none' , color: 'inherit' }}>Register</Link>
                </li>
              </ul> 
          }
      </div>
    </nav>
  )
}