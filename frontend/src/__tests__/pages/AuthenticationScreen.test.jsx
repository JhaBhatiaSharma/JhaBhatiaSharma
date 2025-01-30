// import { render, screen, fireEvent } from '@testing-library/react';
// import AuthenticationScreen from '../../pages/AuthenticationScreen';
// import { AuthContext } from '../../context/authContext';
// import { BrowserRouter } from 'react-router-dom';

// describe('AuthenticationScreen', () => {
//   const mockLogin = jest.fn();

//   const renderWithContext = () => {
//     render(
//       <BrowserRouter>
//         <AuthContext.Provider value={{ login: mockLogin }}>
//           <AuthenticationScreen />
//         </AuthContext.Provider>
//       </BrowserRouter>
//     );
//   };

//   it('renders the login form', () => {
//     renderWithContext();
//     expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
//   });

//   it('calls login on form submission', () => {
//     renderWithContext();
//     fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
//     fireEvent.click(screen.getByText('Sign In'));

//     expect(mockLogin).toHaveBeenCalled();
//   });
// });

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../../context/UserContext";
import AuthenticationScreen from "../../pages/AuthenticationScreen";

describe("AuthenticationScreen", () => {
  const renderWithContext = () =>
    render(
      <BrowserRouter>
        <UserProvider>
          <AuthenticationScreen />
        </UserProvider>
      </BrowserRouter>,
    );

  it("renders the login form", () => {
    renderWithContext();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password"),
    ).toBeInTheDocument();
  });

  it("calls login on form submission", () => {
    renderWithContext();

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Sign In"));

    // Mock login expectations (e.g., API call) go here.
  });
});
