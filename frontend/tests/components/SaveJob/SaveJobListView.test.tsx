import { render, screen } from "@testing-library/react";
import React from "react";
import SaveJobListView from "../../../src/components/SaveJob/SaveJobListView";
import { MemoryRouter } from "react-router";
import { Job } from "../../../src/types/Job";

const mockJobsList: Job[] = [
  {
    _id: "1",
    managerAffilication: "nc-state-dining",
    pay: "100",
    status: "open",
    name: "Software Engineer",
    type: "full-time",
    managerid: "manager123",
    location: "Raleigh, NC",
    description: "Develop and maintain software applications.",
    question1: "Why do you want this job?",
    question2: "Describe your experience.",
    question3: "Any additional comments?",
  },
  {
    _id: "2",
    managerAffilication: "campus-enterprises",
    pay: "120",
    status: "closed",
    name: "Data Analyst",
    type: "part-time",
    managerid: "manager456",
    location: "Durham, NC",
    description: "Analyze and interpret data.",
    question1: "What makes you a good fit for this role?",
    question2: "Describe your technical skills.",
    question3: "Provide examples of past projects.",
  },
];

describe("SaveJobListView", () => {
  it("renders the provided title", () => {
    render(
      <MemoryRouter>
        <SaveJobListView jobsList={mockJobsList} title="My Saved Jobs" />
      </MemoryRouter>
    );
    expect(screen.getByText("My Saved Jobs")).toBeInTheDocument();
  });

  it("renders the default title if no title prop is provided", () => {
    render(
      <MemoryRouter>
        <SaveJobListView jobsList={mockJobsList} />
      </MemoryRouter>
    );
    expect(screen.getByText("Saved jobs")).toBeInTheDocument();
  });

  it("renders a SaveJobListTile for each job in jobsList", () => {
    render(
      <MemoryRouter>
        <SaveJobListView jobsList={mockJobsList} />
      </MemoryRouter>
    );
    const jobTiles = screen.getAllByText(/Role:/i);
    expect(jobTiles.length).toBe(mockJobsList.length);
  });

  it("renders correctly when jobsList is empty", () => {
    render(
      <MemoryRouter>
        <SaveJobListView jobsList={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText("Saved jobs")).toBeInTheDocument();
    expect(screen.queryByText(/Role:/i)).toBeNull();
  });

  it("displays job details correctly for each job", () => {
    render(
      <MemoryRouter>
        <SaveJobListView jobsList={mockJobsList} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Data Analyst/i)).toBeInTheDocument();
  });

  it("does not render any tiles if jobsList is null", () => {
    render(
      <MemoryRouter>
        <SaveJobListView jobsList={null} />
      </MemoryRouter>
    );
    expect(screen.queryByText(/Role:/i)).toBeNull();
  });

  it("updates the title dynamically if title prop changes", () => {
    const { rerender } = render(
      <MemoryRouter>
        <SaveJobListView jobsList={mockJobsList} title="Initial Title" />
      </MemoryRouter>
    );
    expect(screen.getByText("Initial Title")).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <SaveJobListView jobsList={mockJobsList} title="Updated Title" />
      </MemoryRouter>
    );
    expect(screen.getByText("Updated Title")).toBeInTheDocument();
  });

  it("renders job pay correctly for each job", () => {
    render(
      <MemoryRouter>
        <SaveJobListView jobsList={mockJobsList} />
      </MemoryRouter>
    );
    expect(screen.getByText("100$/hr")).toBeInTheDocument();
    expect(screen.getByText("120$/hr")).toBeInTheDocument();
  });
});
