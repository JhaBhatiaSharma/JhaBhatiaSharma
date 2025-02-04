import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddInternship from "../../Pages/Company/AddInternship";

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock API
jest.mock("../../api", () => ({
  post: jest.fn(() => Promise.resolve({ data: { success: true } })),
}));

// Mock window.alert before all tests
const mockAlert = jest.fn();
Object.defineProperty(window, "alert", {
  writable: true,
  value: mockAlert,
});

describe("AddInternship", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    render(<AddInternship />);
  });

  test("renders the form with all fields", () => {
    expect(screen.getByText("Post New Internship")).toBeInTheDocument();

    // Check all input fields
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Location")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Duration (in months)"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Stipend (in USD)")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Add a required skill"),
    ).toBeInTheDocument();

    // Check buttons
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Post Internship" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  test("handles form input changes", () => {
    const titleInput = screen.getByPlaceholderText("Title");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const locationInput = screen.getByPlaceholderText("Location");

    fireEvent.change(titleInput, {
      target: { value: "Software Engineer Intern" },
    });
    fireEvent.change(descriptionInput, {
      target: { value: "Great opportunity" },
    });
    fireEvent.change(locationInput, { target: { value: "New York" } });

    expect(titleInput.value).toBe("Software Engineer Intern");
    expect(descriptionInput.value).toBe("Great opportunity");
    expect(locationInput.value).toBe("New York");
  });

  test("validates duration input", () => {
    const durationInput = screen.getByPlaceholderText("Duration (in months)");

    // Test invalid duration
    fireEvent.change(durationInput, { target: { value: "25" } });
    expect(
      screen.getByText("Duration cannot exceed 24 months"),
    ).toBeInTheDocument();

    // Test valid duration
    fireEvent.change(durationInput, { target: { value: "6" } });
    expect(
      screen.queryByText("Duration cannot exceed 24 months"),
    ).not.toBeInTheDocument();
  });

  test("validates stipend input", () => {
    const stipendInput = screen.getByPlaceholderText("Stipend (in USD)");

    // Test invalid stipend
    fireEvent.change(stipendInput, { target: { value: "-100" } });
    expect(
      screen.getByText("Stipend must be a non-negative number"),
    ).toBeInTheDocument();

    // Test valid stipend
    fireEvent.change(stipendInput, { target: { value: "1000" } });
    expect(
      screen.queryByText("Stipend must be a non-negative number"),
    ).not.toBeInTheDocument();
  });

  test("handles adding and removing skills", () => {
    const skillInput = screen.getByPlaceholderText("Add a required skill");
    const addButton = screen.getByRole("button", { name: "Add" });

    // Add a skill
    fireEvent.change(skillInput, { target: { value: "React" } });
    fireEvent.click(addButton);

    // Verify skill is added
    expect(screen.getByText("React")).toBeInTheDocument();

    // Remove skill
    const removeButton = screen.getByText("×");
    fireEvent.click(removeButton);

    // Verify skill is removed
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  test("handles form submission with valid data", async () => {
    const mockApi = require("../../api");

    // Fill form with valid data
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Software Engineer Intern" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Great opportunity" },
    });
    fireEvent.change(screen.getByPlaceholderText("Location"), {
      target: { value: "New York" },
    });
    fireEvent.change(screen.getByPlaceholderText("Duration (in months)"), {
      target: { value: "6" },
    });
    fireEvent.change(screen.getByPlaceholderText("Stipend (in USD)"), {
      target: { value: "1000" },
    });

    // Submit form
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Post Internship" }));
    });

    expect(mockApi.post).toHaveBeenCalledWith(
      "/internships/addinternship",
      expect.any(Object),
    );
    expect(mockAlert).toHaveBeenCalledWith("Internship added successfully!");
    expect(mockNavigate).toHaveBeenCalledWith("/company"); // Updated to match actual navigation
  });

  test("handles form submission errors", async () => {
    const mockApi = require("../../api");
    mockApi.post.mockRejectedValueOnce({
      response: {
        data: {
          message: "Server error",
        },
      },
    });

    // Fill all required fields
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Software Engineer Intern" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Location"), {
      target: { value: "New York" },
    });
    fireEvent.change(screen.getByPlaceholderText("Duration (in months)"), {
      target: { value: "6" },
    });
    fireEvent.change(screen.getByPlaceholderText("Stipend (in USD)"), {
      target: { value: "1000" },
    });

    // Submit the form
    await act(async () => {
      const submitButton = screen.getByRole("button", {
        name: "Post Internship",
      });
      fireEvent.click(submitButton);
    });

    // Wait for the next tick to allow state updates
    await act(async () => {
      await Promise.resolve();
    });

    // Verify the error alert was shown with the server error message
    expect(mockApi.post).toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith(
      expect.stringContaining("Server error"),
    );
  });

  test("disables submit button when there are validation errors", () => {
    const durationInput = screen.getByPlaceholderText("Duration (in months)");
    const submitButton = screen.getByRole("button", {
      name: "Post Internship",
    });

    // Input invalid duration
    fireEvent.change(durationInput, { target: { value: "25" } });

    // Verify submit button is disabled
    expect(submitButton).toBeDisabled();
  });

  test("handles cancel button click", () => {
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(mockNavigate).toHaveBeenCalledWith("/company"); // Updated to match actual navigation
  });

  test("allows adding skills with Enter key", () => {
    const skillInput = screen.getByPlaceholderText("Add a required skill");

    // Add skill using Enter key
    fireEvent.change(skillInput, { target: { value: "JavaScript" } });
    fireEvent.keyPress(skillInput, { key: "Enter", code: 13, charCode: 13 });

    // Verify skill is added
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });
});
