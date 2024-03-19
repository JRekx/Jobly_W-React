/**
 * Navigation component that renders different navigation
 * depending on if user is logged in or not.
 *
 * Uses React context to get current logged in user.
 * Renders different navbar links depending on
 * if user is logged in or not.
 *
 * Exports Navigation component.
 */
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

function Navigation({ logout }) {
  const { currUser } = useContext(UserContext);
  console.debug("Navigation", "currUser=", currUser);

  function loggedInNav() {
    return (
      <ul className="navbar-nav ml auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/companies">
            Companies
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/jobs">
            Jobs
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <link className="nav-link" to="/" onClick={logout}>
            Logout {currUser.firstName || currUser.username}
          </link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>
      {currUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}
export default Navigation;
