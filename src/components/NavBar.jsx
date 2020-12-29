import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/usersReducer";

const NavBar = () => {
  const user = useSelector((state) => state.users.user);
  const status = useSelector((state) => state.users.status);
  const dispatch = useDispatch();

  const logout = (user) => {
    dispatch(logoutUser(user.id));
    window.location = "/signin";
  };

  const renderContent = () => {
    switch (status) {
      case null: {
        return;
      }
      case false: {
        return [
          <button
            key="1"
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>,
          <div
            key="2"
            className="collapse navbar-collapse"
            id="navbarNavAltMarkup"
          >
            <li className="navbar-brand">
              <h1 style={{ color: "red" }}>Chatty</h1>
            </li>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signin">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>,
        ];
      }
      default:
        return [
          <div
            key="1"
            className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/received-messages">
                  Inbox
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sent-messages">
                  Outbox
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
            </ul>
          </div>,
          <div key="2" className="mx-auto order-0">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".dual-collapse2"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>,
          <div
            key="3"
            className="navbar-collapse collapse w-100 order-3 dual-collapse2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/matches">
                  Matches
                </NavLink>
              </li>
              <li className="nav-item">
                <div
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={(e) => logout(e)}
                >
                  Log Out
                </div>
              </li>
              <li>
                <NavLink className="navbar-brand" to={`/my-profile/${user.id}`}>
                  <img src={user.image} alt="Logo" style={{ width: "40px" }} />
                </NavLink>
              </li>
            </ul>
          </div>,
        ];
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        {renderContent()}
      </nav>
    </>
  );
};

export default NavBar;
