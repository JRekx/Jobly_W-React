import React from "react";
import { render, screen } from "@testing-library/react";

import CompanyList from "./CompanyList";
import JoblyApi from "../api/api";

jest.mock("../api/api");

describe("CompanyList", () => {
  test("renders LoadingSpinner initially", () => {
    render(<CompanyList />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("calls JoblyApi.searchCompanies on mount", () => {
    JoblyApi.searchCompanies.mockResolvedValue([]);
    render(<CompanyList />);
    expect(JoblyApi.searchCompanies).toHaveBeenCalledTimes(1);
  });

  test("displays companies after searchCompanies resolves", async () => {
    const companies = [{ name: "Acme" }];
    JoblyApi.searchCompanies.mockResolvedValue(companies);
    render(<CompanyList />);
    expect(await screen.findByText("Acme")).toBeInTheDocument();
  });

  test("displays message if no companies found", async () => {
    JoblyApi.searchCompanies.mockResolvedValue([]);
    render(<CompanyList />);
    expect(
      await screen.findByText("Sorry, no results were found!")
    ).toBeInTheDocument();
  });

  test("calls JoblyApi.searchCompanies on search", async () => {
    render(<CompanyList />);
    await screen.findByTestId("spinner");

    JoblyApi.searchCompanies.mockResolvedValue([]);
    screen.getByPlaceholderText("Enter search term..").value = "test";
    screen.getByText("Submit").click();

    expect(JoblyApi.searchCompanies).toHaveBeenCalledWith("test");
  });
});
