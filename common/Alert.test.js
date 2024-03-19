import React from "react";
import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert", () => {
  test("renders without crashing", () => {
    render(<Alert />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  test("renders the correct alert type", () => {
    render(<Alert type="warning" />);
    expect(screen.getByRole("alert")).toHaveClass("alert-warning");
  });

  test("renders multiple messages", () => {
    const messages = ["Error 1", "Error 2"];
    render(<Alert messages={messages} />);
    expect(screen.getAllByRole("alert").length).toBe(2);
  });

  test("renders default danger type", () => {
    render(<Alert />);
    expect(screen.getByRole("alert")).toHaveClass("alert-danger");
  });
});
