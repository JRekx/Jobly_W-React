import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  test("renders without crashing", () => {
    render(<SearchForm />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("calls searchFor when form is submitted", () => {
    const searchFor = jest.fn();
    render(<SearchForm searchFor={searchFor} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    userEvent.type(input, "test");
    userEvent.click(button);

    expect(searchFor).toHaveBeenCalledWith("test");
  });

  test("clears input when submitted", () => {
    const searchFor = jest.fn();
    render(<SearchForm searchFor={searchFor} />);

    const input = screen.getByRole("textbox");
    userEvent.type(input, "test");

    const button = screen.getByRole("button");
    userEvent.click(button);

    expect(input).toHaveValue("");
  });
});
