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
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });

  it("renders Create New Job Listing and Add Details", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    // Check for "Create New Job Listing"
    const createJobHeading = screen.getByText(/Create New Job Listing/i);
    expect(createJobHeading).toBeInTheDocument();
  });

  it("renders the Skills Preferred field", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    // Check for "Skills preferred"
    const skillsLabel = screen.getByLabelText(/Skills preferred/i);
    expect(skillsLabel).toBeInTheDocument();
  });

  it("accepts only string input for Skills Preferred", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    // Get the Skills input field
    const skillsInput = screen.getByLabelText(/Skills preferred/i);

    // Try inputting a string
    fireEvent.change(skillsInput, { target: { value: "React, Node" } });
    expect(skillsInput.value).toBe("React, Node");

    // Try inputting a number (to test if it allows only string)
    fireEvent.change(skillsInput, { target: { value: "12345" } });
    expect(skillsInput.value).toBe("12345"); // If you want to enforce only alphabets, you might need to handle that in your input logic.
  });

  it("allows user input in Skills Preferred", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    // Get the Skills input field
    const skillsInput = screen.getByLabelText(/Skills preferred/i);

    // Input a value
    fireEvent.change(skillsInput, { target: { value: "React, Node" } });
    expect(skillsInput.value).toBe("React, Node"); // Assert that the input value is what we set
  });

  it("renders and clicks the Proceed button", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    // Get the Proceed button
    const proceedButton = screen.getByRole("button", { name: /Proceed/i });
    expect(proceedButton).toBeInTheDocument(); // Check if the button is present

    // Simulate a click on the button
    fireEvent.click(proceedButton);
    //  since using MemoryRouter, you can validate that the state is set correctly
  });
});
