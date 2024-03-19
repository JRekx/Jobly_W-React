/**
 * Homepage component that displays a welcome message and login/register
 * links. Uses UserContext to check if a user is logged in and conditionally
 * show personalized content.
 */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

function Homepage() {
  const { currUser } = useContext(UserContext);
  console.debug("Homepage", "currUser=", currUser);

  return (
    <div classNamelassName="Home">
      <div className="container text-center">
        <h1 className="mb -4 font-weight-bold">Jobly</h1>
        <p className="lead">All your jobs in one place</p>
        {currUser ? (
          <h2>Welcome {currUser.firstName || currUser.username}!</h2>
        ) : (
          <p>
            <Link className="btn btn-primary font-weight-bold mr-3" to="/login">
              login
            </Link>
            <Link className="btn btn-primary font-weight-bold" to="/signup">
              Register Here!
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
