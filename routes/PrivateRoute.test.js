import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UserContext from "../auth/UserContext";

describe("PrivateRoute", () => {
  test("redirects to /login if no user", () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <PrivateRoute path="/profile">
          <p>Profile</p>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("renders child component at route if user is authenticated", () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <UserContext.Provider value={{ currUser: { id: 1 } }}>
          <PrivateRoute path="/profile">
            <p>Profile</p>
          </PrivateRoute>
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
});
