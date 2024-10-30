import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import JobDetail from "/Users/ishikag/Documents/Fall_2024/SE/WolfJobs/frontend/src/components/Job/JobDetails.tsx"; // Adjust the import path as needed

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

    // Check if the Skills heading is present twice
    const skillsHeadings = screen.getAllByText(/Skills/i);
    expect(skillsHeadings.length).toBe(2); // Ensure there are exactly 2 instances of "Skills"
  });

  it("should display the matched percentage", () => {
    render(
      <JobDetail
        jobData={mockJobData}
        matchedSkills={matchedSkills}
        matchedpercent={matchedPercent}
      />
    );

    // Check if the matched percentage is displayed
    const matchedPercentText = screen.getByText(/Skills 66 % matched/i);
    expect(matchedPercentText).toBeInTheDocument();
  });
});
