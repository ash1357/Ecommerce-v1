import React from 'react'
import { NavLink } from 'react-router-dom'

const Adminheader = () => {
    return (
        <div>
              <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
          <div className="container">
            <a href="index.html" className="navbar-brand">Blogen</a>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav">
                <li className="nav-item px-2">
                  <NavLink to="/Admindashboard" className="nav-link active">Dashboard</NavLink>
                </li>
                <li className="nav-item px-2">
                  <NavLink to="/AdminProduct" className="nav-link">Product</NavLink>
                </li>
                <li className="nav-item px-2">
                  <NavLink to="/Admincategories" className="nav-link">Categories</NavLink>
                </li>
                <li className="nav-item px-2">
                  <NavLink to="/Adminusers" className="nav-link">Users</NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown mr-3">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-user" /> Welcome Admin
                  </a>
                  <div className="dropdown-menu">
                    <NavLink to="/Adminprofile" className="dropdown-item">
                      <i className="fas fa-user-circle" /> Profile
                    </NavLink>
                    <NavLink to="/Adminsettings" className="dropdown-item">
                      <i className="fas fa-cog" /> Settings
                    </NavLink>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink to="/Userlogin" className="nav-link">
                    <i className="fas fa-user-times" /> Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </div>
    )
}

export default Adminheader
