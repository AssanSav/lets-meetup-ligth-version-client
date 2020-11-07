import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.users.user)
  const status = useSelector(state => state.users.status)

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        {!status ?
          <>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <li className="navbar-brand" >
                <h1 style={{ color: "red" }}>Chatty</h1>
              </li>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signin">Login</NavLink>
                </li>
              </ul>
            </div>
          </>
          :
          <>
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/received-messages">Inbox</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sent-messages">Outbox</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">Users</NavLink>
                </li>
              </ul>
            </div>
            <div className="mx-auto order-0">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/matches">Matches</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout" >Log Out</NavLink>
                </li>
                <li>
                  <NavLink className="navbar-brand" to={`/my-profile/${user.id}`}>
                    <img src={user.image} alt="Logo" style={{ width: "40px" }} />
                  </NavLink>
                </li>
              </ul>
            </div>
          </>}
      </nav>
    </>
  );
}

export default NavBar