import { render, screen } from "@testing-library/react";
import React from "react";
import JobListView from "../../../src/components/Job/JobListView";
import { MemoryRouter } from "react-router-dom";

describe("JobListView", () => {
  const jobs = [
    { _id: 1, title: "Software Engineer", location: "Raleigh, NC", type: "full-time" },
    { _id: 2, title: "Data Analyst", location: "New York, NY", type: "part-time" },
    { _id: 3, title: "Product Manager", location: "San Francisco, CA", type: "full-time" }
  ];

  it("renders JobListView with title", () => {
    render(
      <MemoryRouter>
        <JobListView JobList={jobs} title="All jobs" filter="all" />
      </MemoryRouter>
    );
    expect(screen.getByText("All jobs")).toBeInTheDocument();
  });

  it("renders all job items when filter is 'all'", () => {
    render(
      <MemoryRouter>
        <JobListView JobList={jobs} title="Job Openings" filter="all" />
      </MemoryRouter>
    );

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Data Analyst")).toBeInTheDocument();
    expect(screen.getByText("Product Manager")).toBeInTheDocument();
  });

  it("renders only full-time jobs when filter is 'full-time'", () => {
    render(
      <MemoryRouter>
        <JobListView JobList={jobs} title="Full-Time Jobs" filter="full-time" />
      </MemoryRouter>
    );

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Product Manager")).toBeInTheDocument();
    expect(screen.queryByText("Data Analyst")).not.toBeInTheDocument(); // Part-time job should not appear
  });

  it("renders only part-time jobs when filter is 'part-time'", () => {
    render(
      <MemoryRouter>
        <JobListView JobList={jobs} title="Part-Time Jobs" filter="part-time" />
      </MemoryRouter>
    );

    expect(screen.getByText("Data Analyst")).toBeInTheDocument();
    expect(screen.queryByText("Software Engineer")).not.toBeInTheDocument();
    expect(screen.queryByText("Product Manager")).not.toBeInTheDocument();
  });

  it("displays a message if no jobs match the selected filter", () => {
    render(
      <MemoryRouter>
        <JobListView JobList={jobs} title="Temporary Jobs" filter="temporary" />
      </MemoryRouter>
    );

    expect(screen.getByText("No jobs available")).toBeInTheDocument();
  });
});

