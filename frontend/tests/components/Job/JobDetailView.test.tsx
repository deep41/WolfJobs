import { render, screen } from "@testing-library/react";
import React from "react";
import JobDetailView from "../../../src/components/Job/JobDetailView";
import { MemoryRouter } from "react-router";

describe("JobDetailView", () => {
  it("renders JobDetailView", () => {
    render(
      <MemoryRouter>
        <JobDetailView />
      </MemoryRouter>
    );
  });
});
