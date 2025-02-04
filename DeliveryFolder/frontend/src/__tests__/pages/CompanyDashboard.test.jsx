import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import CompanyDashboard from "../../Pages/Company/CompanyDashboard";

// Mock components
jest.mock("@/components/ui/card", () => ({
  Card: ({ children }) => <div>{children}</div>,
  CardHeader: ({ children }) => <div>{children}</div>,
  CardTitle: ({ children }) => <div>{children}</div>,
  CardDescription: ({ children }) => <div>{children}</div>,
  CardContent: ({ children }) => <div>{children}</div>,
}));

jest.mock("../../components/UserMenuDropdown", () => {
  return function DummyUserMenuDropdown() {
    return <div data-testid="user-menu">User Menu</div>;
  };
});

jest.mock("../../Pages/MessagingSystem", () => {
  return function DummyMessagingSystem() {
    return <div data-testid="messaging-system">Messaging System</div>;
  };
});

// Mock DatePicker
jest.mock("react-datepicker", () => {
  return function DummyDatePicker() {
    return <div data-testid="date-picker">Date Picker</div>;
  };
});

// Mock API
jest.mock("../../api", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  patch: jest.fn(() => Promise.resolve({})),
}));

// Mock router
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(() => "fake-token"),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("CompanyDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders basic dashboard elements", async () => {
    render(
      <BrowserRouter>
        <CompanyDashboard />
      </BrowserRouter>,
    );

    // Check header with correct text
    expect(screen.getByText("InternHub Dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your internship programs"),
    ).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText("Post New Internship")).toBeInTheDocument();
    expect(screen.getByText("Open Messaging")).toBeInTheDocument();
  });

  test("renders stats cards", () => {
    render(
      <BrowserRouter>
        <CompanyDashboard />
      </BrowserRouter>,
    );

    // Check stats cards
    const statsTexts = [
      "Active Positions",
      "Total Applicants",
      "Scheduled Interviews",
      "Hired This Month",
    ];

    statsTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test("opens messaging system", () => {
    render(
      <BrowserRouter>
        <CompanyDashboard />
      </BrowserRouter>,
    );

    const messagingButton = screen.getByText("Open Messaging");
    fireEvent.click(messagingButton);
    expect(screen.getByTestId("messaging-system")).toBeInTheDocument();
  });

  test("navigates to add internship page", () => {
    render(
      <BrowserRouter>
        <CompanyDashboard />
      </BrowserRouter>,
    );

    const addButton = screen.getByText("Post New Internship");
    fireEvent.click(addButton);
    expect(mockNavigate).toHaveBeenCalledWith("/add-internship");
  });
});
