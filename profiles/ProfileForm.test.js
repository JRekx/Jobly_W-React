import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileForm from "./ProfileForm";

describe("ProfileForm", () => {
  test("renders profile form", () => {
    render(<ProfileForm />);
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  test("updates first name value on change", () => {
    render(<ProfileForm />);
    const firstNameInput = screen.getByLabelText("First Name");
    userEvent.type(firstNameInput, "John");
    expect(firstNameInput.value).toBe("John");
  });

  test("updates last name value on change", () => {
    render(<ProfileForm />);
    const lastNameInput = screen.getByLabelText("Last Name");
    userEvent.type(lastNameInput, "Doe");
    expect(lastNameInput.value).toBe("Doe");
  });

  test("updates email value on change", () => {
    render(<ProfileForm />);
    const emailInput = screen.getByLabelText("Email");
    userEvent.type(emailInput, "john@doe.com");
    expect(emailInput.value).toBe("john@doe.com");
  });

  test("updates password value on change", () => {
    render(<ProfileForm />);
    const passwordInput = screen.getByLabelText("Password");
    userEvent.type(passwordInput, "password123");
    expect(passwordInput.value).toBe("password123");
  });

  test("calls handleSubmit on form submit", () => {
    const handleSubmit = jest.fn();
    render(<ProfileForm handleSubmit={handleSubmit} />);
    const submitButton = screen.getByText("Save Changes");
    userEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
