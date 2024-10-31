import { render, screen, fireEvent } from "@testing-library/react";
import CreateJob from "../../../src/Pages/CreateJob/CreateJob";
import { MemoryRouter } from "react-router";

describe("CreateJob", () => {
  it("renders CreateJob", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );
  });

  it("renders Create New Job Listing and Add Details", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    const createJobHeading = screen.getByText(/Create New Job Listing/i);
    expect(createJobHeading).toBeInTheDocument();
  });

  it("renders the Skills Preferred field", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    const skillsLabel = screen.getByLabelText(/Skills preferred/i);
    expect(skillsLabel).toBeInTheDocument();
  });

  it("accepts only string input for Skills Preferred", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    const skillsInput = screen.getByLabelText(/Skills preferred/i);

    fireEvent.change(skillsInput, { target: { value: "React, Node" } });
    expect(skillsInput.value).toBe("React, Node");

    fireEvent.change(skillsInput, { target: { value: "12345" } });
    expect(skillsInput.value).toBe("12345");
  });

  it("allows user input in Skills Preferred", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    const skillsInput = screen.getByLabelText(/Skills preferred/i);

    fireEvent.change(skillsInput, { target: { value: "React, Node" } });
    expect(skillsInput.value).toBe("React, Node"); // Assert that the input value is what we set
  });

  it("renders and clicks the Proceed button", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    const proceedButton = screen.getByRole("button", { name: /Proceed/i });
    expect(proceedButton).toBeInTheDocument();

    fireEvent.click(proceedButton);
  });
});
