import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import JobDetail from "../../../src/components/Job/JobDetails.tsx";

describe("JobDetail Component", () => {
  const mockJobData = {
    _id: "1",
    name: "Software Engineer",
    type: "full-time",
    location: "Remote",
    status: "open",
    skills: ["JavaScript", "React", "Node.js"],
    description: "Job description here.",
  };

  const matchedSkills = ["JavaScript", "React"];
  const matchedPercent = Math.floor(
    (matchedSkills.length / mockJobData.skills.length) * 100
  );

  it("should display the Skills keyword below which user skills are displayed", () => {
    render(
      <JobDetail
        jobData={mockJobData}
        matchedSkills={matchedSkills}
        matchedpercent={matchedPercent}
      />
    );

    const skillsHeadings = screen.getAllByText(/Skills/i);
    expect(skillsHeadings.length).toBe(2);
  });

  it("should display the matched percentage", () => {
    render(
      <JobDetail
        jobData={mockJobData}
        matchedSkills={matchedSkills}
        matchedpercent={matchedPercent}
      />
    );

    const matchedPercentText = screen.getByText(/Skills 66 % matched/i);
    expect(matchedPercentText).toBeInTheDocument();
  });
});
