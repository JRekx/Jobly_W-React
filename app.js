/**
 * App component that sets up and renders the main Jobly application.
 * Handles user login state, routing, and shared context.
 */
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=",
    infoLoaded,
    "currentUser=",
    currentUser,
    "token=",
    token
  );
  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            JoblyApi.token = token;

            let currUser = await JoblyApi.getCurrUser(username);
            setCurrentUser(currUser);
            setApplicationIds(new Set(currUser.applications));
          } catch (err) {
            console.error("App loadUserInfo getCurrUser error", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      setInfoLoaded(false);
      getCurrUser();
    },
    [token]
  );

  function logout() {
    setCurrentUser(null); // Fixed typo: setCurrtUser -> setCurrentUser
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("App signup error", err);
      return { success: false, error: err };
    }
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currUser, setCurrentUser, hasAppliedToJob, applyToJob }}
      >
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
