import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignupScreen from "../../Pages/SignupScreen";

// Mock the modules
jest.mock("../../api");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("SignupScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  test("renders signup form", () => {
    render(
      <BrowserRouter>
        <SignupScreen />
      </BrowserRouter>,
    );

    // Check if main elements are rendered
    expect(screen.getByPlaceholderText("Enter first name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Create password")).toBeInTheDocument();
  });

  test("toggles between user types", () => {
    render(
      <BrowserRouter>
        <SignupScreen />
      </BrowserRouter>,
    );

    const universityInput = () =>
      screen.queryByPlaceholderText("Enter your university");
    const companyButton = screen.getByText("Company");
    const studentButton = screen.getByText("Student");

    // Initially university input should be visible (student is default)
    expect(universityInput()).toBeInTheDocument();

    // Click company button
    fireEvent.click(companyButton);
    expect(universityInput()).not.toBeInTheDocument();

    // Click student button
    fireEvent.click(studentButton);
    expect(universityInput()).toBeInTheDocument();
  });
});
