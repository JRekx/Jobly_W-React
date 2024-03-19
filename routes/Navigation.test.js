import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

describe("Navigation", () => {
  test("renders logged out navigation when no user", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("renders profile link when user is logged in", () => {
    const currUser = { firstName: "Test", username: "test123" };

    render(
      <MemoryRouter>
        <Navigation currUser={currUser} />
      </MemoryRouter>
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout Test")).toBeInTheDocument();
  });

  test("calls logout function when logout link clicked", () => {
    const logout = jest.fn();
    render(
      <MemoryRouter>
        <Navigation logout={logout} />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText("Logout"));
    expect(logout).toHaveBeenCalled();
  });
});
