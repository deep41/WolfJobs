import { render, screen } from "@testing-library/react";
import SaveJobListTile from "../../../src/components/SaveJob/SaveJobListTile";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

describe("SaveJobListTile", () => {
  const jobData = {
    _id: "1",
    managerAffilication: "nc-state-dining",
    pay: "100",
    status: "closed",
    name: "Software Developer",
    type: "full-time",
  };

  it("renders SaveJobListTile with job details", () => {
    render(
      <MemoryRouter>
        <SaveJobListTile data={jobData} />
      </MemoryRouter>
    );
    expect(screen.getByText(/nc state dining/i)).toBeInTheDocument();
    expect(screen.getByText(/software developer/i)).toBeInTheDocument();
    expect(screen.getByText(/closed/i)).toBeInTheDocument();
    expect(screen.getByText(/full time/i)).toBeInTheDocument();
    expect(screen.getByText("100$/hr")).toBeInTheDocument();
  });

  it("displays the job status as open with no color class if the job is open", () => {
    render(
      <MemoryRouter>
        <SaveJobListTile data={{ ...jobData, status: "open" }} />
      </MemoryRouter>
    );
    const status = screen.getByText(/open/i);
    expect(status).not.toHaveClass("text-[#FF5353]");
  });

  it("does not render pay section if no pay information is provided", () => {
    render(
      <MemoryRouter>
        <SaveJobListTile data={{ ...jobData, pay: "" }} />
      </MemoryRouter>
    );
    expect(screen.queryByText(/100\$/)).not.toBeInTheDocument();
  });

  it("renders 'part-time' if the job type is part-time", () => {
    render(
      <MemoryRouter>
        <SaveJobListTile data={{ ...jobData, type: "part-time" }} />
      </MemoryRouter>
    );
    expect(screen.getByText(/part time/i)).toBeInTheDocument();
  });

  it("renders 'contract' if the job type is contract", () => {
    render(
      <MemoryRouter>
        <SaveJobListTile data={{ ...jobData, type: "contract" }} />
      </MemoryRouter>
    );
    expect(screen.getByText(/contract/i)).toBeInTheDocument();
  });
});
