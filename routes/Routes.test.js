import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routes from "./Routes";

describe("Routes", () => {
  test("renders homepage route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(screen.getByText("Jobly")).toBeInTheDocument();
  });

  test("redirects to login route", () => {
    render(
      <MemoryRouter initialEntries={["/companies"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("renders signup route", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("redirects to homepage from invalid route", () => {
    render(
      <MemoryRouter initialEntries={["/invalid"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(screen.getByText("Jobly")).toBeInTheDocument();
  });
});
