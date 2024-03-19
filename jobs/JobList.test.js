import React from "react";
import { render, screen } from "@testing-library/react";
import JobList from "./JobList";

describe("JobList", () => {
  test("renders LoadingSpinner if jobs null", () => {
    render(<JobList jobs={null} />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("renders no jobs message if jobs empty", () => {
    render(<JobList jobs={[]} />);
    expect(screen.getByText(/no jobs found/i)).toBeInTheDocument();
  });

  test("renders JobCardList if jobs populated", () => {
    const jobs = [{ id: 1, title: "Job 1" }];
    render(<JobList jobs={jobs} />);
    expect(screen.getByTestId("job-card-list")).toBeInTheDocument();
  });

  test("calls search function on submit", async () => {
    const search = jest.fn();
    render(<JobList search={search} />);
    screen.getByRole("button").click();
    expect(search).toHaveBeenCalled();
  });
});
