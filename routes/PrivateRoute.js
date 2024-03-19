/**
 * PrivateRoute component renders a Route component that redirects to /login
 * if the user is not authenticated. It checks UserContext.currUser to
 * determine if a user is authenticated.
 *
 * It renders the passed in children prop if a user is authenticated.
 */
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

function PrivateRoute({ exact, path, children }) {
  const { currUser } = useContext(UserContext);

  console.debug(
    "PrivateRoute",
    "currUser=",
    currUser,
    "exact=",
    exact,
    "path=",
    path
  );

  if (!currUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
