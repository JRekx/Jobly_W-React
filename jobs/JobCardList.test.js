import React from "react";
import { render, screen } from "@testing-library/react";
import JobCardList from "./JobCardList";

describe("JobCardList", () => {
  test("renders no cards when jobs list is empty", () => {
    render(<JobCardList jobs={[]} />);
    expect(screen.queryByText(/job title/i)).not.toBeInTheDocument();
  });

  test("renders correct number of JobCard components", () => {
    const jobs = [
      { id: 1, title: "Job 1" },
      { id: 2, title: "Job 2" },
      { id: 3, title: "Job 3" },
    ];
    render(<JobCardList jobs={jobs} />);
    expect(screen.getAllByTestId("job-card")).toHaveLength(3);
  });

  test("passes job data to JobCard components", () => {
    const job = {
      id: 1,
      title: "Software Engineer",
      companyName: "Acme",
    };
    render(<JobCardList jobs={[job]} />);
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Acme")).toBeInTheDocument();
  });
});
