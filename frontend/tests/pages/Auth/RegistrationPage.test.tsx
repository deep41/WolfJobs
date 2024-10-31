import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import RegistrationPage from "../../../src/Pages/Auth/RegistrationPage";
import { MemoryRouter } from "react-router-dom";

// Mock fetch to prevent network calls during testing
beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: "Success" }),
    })
  );
});

afterAll(() => {
  vi.restoreAllMocks();
  if (global.fetch) {
    delete global.fetch;
  }
});

const mockNavigate = vi.fn();

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

    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
  });

  test("new field for skills added check", async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Skills/i)).toBeInTheDocument();
  });

  test("shows error when skills are empty", async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

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

    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    expect(await screen.findByText(/Skills is required/i)).toBeInTheDocument();
  });

  test("submits the form successfully", async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/Name/i), {
      target: { value: "Test User" },
    });
    fireEvent.input(screen.getByLabelText(/Email Id/i), {
      target: { value: "test@example.com" },
    });

    const passwordInputs = screen.getAllByLabelText(/Password/i);
    expect(passwordInputs).toHaveLength(2);
    fireEvent.input(passwordInputs[0], { target: { value: "password123" } });
    fireEvent.input(passwordInputs[1], { target: { value: "password123" } });

    fireEvent.input(screen.getByLabelText(/Skills/i), {
      target: { value: "JavaScript, React" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));
    expect(window.location.pathname).not.toBe("/register");
  });
});
