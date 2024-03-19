import React from "react";
import { render, screen } from "@testing-library/react";
import CompanyCard from "./CompanyCard";

describe("CompanyCard", () => {
  test("renders company name", () => {
    render(<CompanyCard name="Acme Co" />);
    expect(screen.getByText("Acme Co")).toBeInTheDocument();
  });

  test("renders company description", () => {
    render(<CompanyCard name="Acme Co" description="A widget company" />);
    expect(screen.getByText("A widget company")).toBeInTheDocument();
  });

  test("renders company logo", () => {
    render(<CompanyCard name="Acme Co" LogoUrl="/logo.png" />);
    expect(screen.getByAltText("Acme Co")).toHaveAttribute("src", "/logo.png");
  });

  test("links to company page", () => {
    render(<CompanyCard name="Acme Co" handle="acme" />);
    expect(screen.getByText("Acme Co").closest("a")).toHaveAttribute(
      "href",
      "/companies/acme"
    );
  });
});
