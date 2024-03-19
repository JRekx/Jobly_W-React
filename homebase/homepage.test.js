import React from "react";
import { render, screen } from "@testing-library/react";
import Homepage from "./homepage";
import { UserContextProvider } from "../auth/UserContext";

describe("Homepage", () => {
  test("renders welcome message when no user", () => {
    render(
      <UserContextProvider>
        <Homepage />
      </UserContextProvider>
    );

    expect(screen.getByText("Welcome")).not.toBeInTheDocument();
    expect(screen.getByText("login")).toBeInTheDocument();
    expect(screen.getByText("Register Here!")).toBeInTheDocument();
  });

  test("renders personalized welcome when user logged in", () => {
    render(
      <UserContextProvider value={{ currUser: { firstName: "John" } }}>
        <Homepage />
      </UserContextProvider>
    );

    expect(screen.getByText("Welcome John!")).toBeInTheDocument();
    expect(screen.queryByText("login")).not.toBeInTheDocument();
    expect(screen.queryByText("Register Here!")).not.toBeInTheDocument();
  });

  test("renders username when no first name", () => {
    render(
      <UserContextProvider value={{ currUser: { username: "john123" } }}>
        <Homepage />
      </UserContextProvider>
    );

    expect(screen.getByText("Welcome john123!")).toBeInTheDocument();
  });
});
