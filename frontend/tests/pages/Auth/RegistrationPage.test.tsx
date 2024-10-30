import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import RegistrationPage from "../../../src/Pages/Auth/RegistrationPage";
import { MemoryRouter } from "react-router-dom";

describe("RegistrationPage", () => {
  it("renders RegistrationPage", () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Create New Account/i)).toBeInTheDocument();
  });

  test("shows error when name is empty", async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Click the submit button without filling in the form
    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    // Check for the error message
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
  });
  test("new field for skills added check", async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Check if the Skills label is present in the document
    expect(screen.getByLabelText(/Skills/i)).toBeInTheDocument();
  });

  test("shows error when skills are empty", async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Fill in other fields
    fireEvent.input(screen.getByLabelText(/Name/i), {
      target: { value: "Test User" },
    });
    fireEvent.input(screen.getByLabelText(/Email Id/i), {
      target: { value: "test@example.com" },
    });
    const passwordInputs = screen.getAllByLabelText(/Password/i);
    fireEvent.input(passwordInputs[0], {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getAllByLabelText(/Confirm password/i)[0], {
      target: { value: "password123" },
    });

    // Click the submit button
    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    // Check for the error message
    expect(await screen.findByText(/Skills is required/i)).toBeInTheDocument();
  });

  test("submits the form successfully", async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Fill in the fields
    fireEvent.input(screen.getByLabelText(/Name/i), {
      target: { value: "Test User" },
    });
    fireEvent.input(screen.getByLabelText(/Email Id/i), {
      target: { value: "test@example.com" },
    });
    // Before

    fireEvent.input(screen.getAllByLabelText(/Password/i)[0], {
      target: { value: "password123" },
    });

    // After (using getAllByLabelText)
    const passwordInputs = screen.getAllByLabelText(/Password/i);
    expect(passwordInputs).toHaveLength(2); // Ensure you have two fields (password and confirm password)
    fireEvent.input(passwordInputs[0], { target: { value: "password123" } });

    fireEvent.input(screen.getByLabelText(/Confirm password/i), {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getByLabelText(/Skills/i), {
      target: { value: "JavaScript, React" },
    });

    // Click the submit button
    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    // Assuming your form handles navigation, you can verify a change in the DOM or URL if necessary
    //could have checked some word if it is in the document (like registration successful)
  });
});
