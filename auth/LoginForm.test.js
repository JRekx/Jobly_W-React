import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  const login = jest.fn();

  beforeEach(() => {
    render(<LoginForm login={login} />);
  });

  test("calls login function on submit with form data", async () => {
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    userEvent.type(usernameInput, "testusername");
    userEvent.type(passwordInput, "testpassword");
    userEvent.click(screen.getByText("Submit"));

    expect(login).toHaveBeenCalledWith({
      username: "testusername",
      password: "testpassword",
    });
  });

  test("displays alert on error", async () => {
    login.mockRejectedValueOnce({
      errors: ["Invalid username/password"],
    });

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByText("Submit");

    userEvent.type(usernameInput, "testusername");
    userEvent.type(passwordInput, "testpassword");
    userEvent.click(submitBtn);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Invalid username/password");
  });

  test("redirects to /companies on success", async () => {
    login.mockResolvedValueOnce({ success: true });

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByText("Submit");

    userEvent.type(usernameInput, "testusername");
    userEvent.type(passwordInput, "testpassword");
    userEvent.click(submitBtn);

    expect(window.location.pathname).toBe("/companies");
  });
});
