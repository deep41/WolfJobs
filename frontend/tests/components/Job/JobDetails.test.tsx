import { render, screen } from "@testing-library/react";
import React from "react";
import JobDetails from "../../../src/components/Job/JobDetails";
import { MemoryRouter } from "react-router";

describe("JobDetails", () => {
  it("renders JobDetails", () => {
    render(
      <MemoryRouter>
        <JobDetails
          jobData={{
            type: "part-time",
            _id: 1,
            managerid: 1,
            name: "Developer",
            status: "open",
            location: "Raleigh",
            pay: "100",
            skills: "React, Node",
            description: "Developer",
            question1: "Work experience?",
            question2: "CGPA?",
            question3: "Age?",
            question4: "Skills?",
          }}
        />
      </MemoryRouter>
    );
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });
});
