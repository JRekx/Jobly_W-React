import React from "react";
import { render, screen } from "@testing-library/react";
import JobCard from "./JobCard";

describe("JobCard", () => {
  test("renders job title", () => {
    render(<JobCard title="Software Engineer" />);
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  test("renders company name", () => {
    render(<JobCard companyName="Acme Inc" />);
    expect(screen.getByText("Acme Inc")).toBeInTheDocument();
  });

  test("renders salary", () => {
    render(<JobCard salary={100000} />);
    expect(screen.getByText("Salary: $100,000")).toBeInTheDocument();
  });

  test("renders equity", () => {
    render(<JobCard equity={0.2} />);
    expect(screen.getByText("Equity: 0.2")).toBeInTheDocument();
  });

  test("applies formatting to large salary", () => {
    render(<JobCard salary={12345678} />);
    expect(screen.getByText("Salary: $12,345,678")).toBeInTheDocument();
  });

  test("disables apply button when already applied", () => {
    render(<JobCard applied={true} />);
    expect(screen.getByText("Applied")).toBeDisabled();
  });
});
