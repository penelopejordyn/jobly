import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import './Nav.css'

function Nav({ isloggedIn, logout }) {


    const loggedInLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4"><NavLink exact to="/companies">Companies</NavLink></li>
            <li className="nav-item mr-4"><NavLink exact to="/jobs">Jobs</NavLink></li>
            <li className="nav-item mr-4"><NavLink exact to="/apps">My Applications</NavLink></li>
            <li className="nav-item mr-4"><NavLink exact to="/profile">Profile</NavLink></li>
            <li className="nav-item mr-4"><Link to="/" onClick={logout}>Logout</Link></li>
        </ul>
    )

    const links = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4"><NavLink exact to="/login">Login</NavLink></li>
        </ul>
    )


    return (
        <div>
            <nav className="Nav navbar navbar-expand-md">
                <Link to="/" className="navbar-brand">Jobly</Link>
                {(isloggedIn) ? loggedInLinks : links}
            </nav>
        </div>
    )

}

export default Nav;
