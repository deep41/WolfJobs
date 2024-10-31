import { render, screen } from "@testing-library/react";
import React from "react";
import JobsListView from "../../../src/components/Job/JobsListView";
import { MemoryRouter } from "react-router-dom";

describe("JobsListView", () => {
  it("renders JobsListView", () => {
    const mockJobs = [
      { _id: "1", type: "full-time" },
      { _id: "2", type: "part-time" },
    ];

    render(
      <MemoryRouter>
        <JobsListView jobsList={mockJobs} title="All jobs" />
      </MemoryRouter>
    );

    // You can add assertions here to verify correct rendering
    expect(screen.getByText("All jobs")).toBeInTheDocument();
  });
});
