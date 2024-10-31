import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import JobListTile from "../../../src/components/Job/JobListTile";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import axios from "axios";

vi.mock("axios");
const mockedAxios = vi.mocked(axios);

describe("JobListTile", () => {
  const jobData = {
    _id: "1",
    managerAffilication: "nc-state-dining",
    pay: "100",
    status: "open",
    name: "Software Developer",
    type: "full-time",
  };

  it("saves a job when the Save Job button is clicked", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    render(
      <MemoryRouter>
        <JobListTile data={jobData} />
      </MemoryRouter>
    );

    const saveButton = screen.getByText(/save job/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(expect.any(String), {
        jobId: jobData._id,
        userId: expect.any(String),
      });
      expect(screen.getByText(/unsave job/i)).toBeInTheDocument();
    });
  });

  it("unsaves a job when the Unsave Job button is clicked", async () => {
    localStorage.setItem("savedJobs", JSON.stringify([jobData]));

    mockedAxios.delete.mockResolvedValueOnce({ data: { success: true } });

    render(
      <MemoryRouter>
        <JobListTile data={jobData} />
      </MemoryRouter>
    );

    const unsaveButton = screen.getByText(/unsave job/i);
    fireEvent.click(unsaveButton);

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith(expect.any(String), {
        data: { jobId: jobData._id, userId: expect.any(String) },
      });
      expect(screen.getByText(/save job/i)).toBeInTheDocument();
    });
  });

});
