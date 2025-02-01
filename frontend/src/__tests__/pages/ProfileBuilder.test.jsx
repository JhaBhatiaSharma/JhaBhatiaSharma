import { render, screen } from "@testing-library/react";
import ProfileBuilder from "../../Pages/ProfileBuilder";

describe("ProfileBuilder", () => {
  test("renders basic profile elements", () => {
    render(<ProfileBuilder />);

    // Test main heading
    expect(screen.getByText("Build Your Profile")).toBeInTheDocument();

    // Test form inputs exist
    expect(screen.getByPlaceholderText("John")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Doe")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write a brief professional summary..."),
    ).toBeInTheDocument();

    // Test basic buttons exist
    expect(
      screen.getByRole("button", { name: "Save Changes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Preview Profile" }),
    ).toBeInTheDocument();
  });

  test("renders default education and experience entries", () => {
    render(<ProfileBuilder />);

    // Test education entry
    expect(
      screen.getByText("Bachelor of Computer Science"),
    ).toBeInTheDocument();
    expect(screen.getByText("University of Technology")).toBeInTheDocument();

    // Test experience entry
    expect(screen.getByText("Software Developer Intern")).toBeInTheDocument();
    expect(screen.getByText("Tech Solutions Inc.")).toBeInTheDocument();
  });
});
