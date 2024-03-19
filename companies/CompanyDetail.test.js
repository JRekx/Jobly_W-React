import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CompanyDetail from "./CompanyDetail";
import JoblyApi from "../api/api";

jest.mock("../api/api");

describe("CompanyDetail", () => {
  const company = {
    handle: "acme",
    name: "Acme Company",
    description: "A widget company",
    jobs: [
      { id: 1, title: "Engineer" },
      { id: 2, title: "Manager" },
    ],
  };

  beforeEach(() => {
    JoblyApi.getCompany.mockResolvedValue(company);
  });

  test("displays company name and description", async () => {
    render(
      <MemoryRouter initialEntries={["/companies/acme"]}>
        <CompanyDetail />
      </MemoryRouter>
    );

    expect(await screen.findByText("Acme Company")).toBeInTheDocument();
    expect(screen.getByText("A widget company")).toBeInTheDocument();
  });

  test("displays jobs for company", async () => {
    render(
      <MemoryRouter initialEntries={["/companies/acme"]}>
        <CompanyDetail />
      </MemoryRouter>
    );

    expect(await screen.findByText("Engineer")).toBeInTheDocument();
    expect(screen.getByText("Manager")).toBeInTheDocument();
  });

  test("displays spinner while loading", () => {
    render(
      <MemoryRouter initialEntries={["/companies/acme"]}>
        <CompanyDetail />
      </MemoryRouter>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("displays error if company not found", async () => {
    JoblyApi.getCompany.mockRejectedValue(new Error("Company not found"));

    render(
      <MemoryRouter initialEntries={["/companies/acme"]}>
        <CompanyDetail />
      </MemoryRouter>
    );

    expect(await screen.findByText("Company not found")).toBeInTheDocument();
  });
});
