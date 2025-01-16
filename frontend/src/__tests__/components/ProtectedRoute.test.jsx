// import { render, screen, waitFor } from '@testing-library/react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ProtectedRoute from '../../components/ProtectedRoute';
// import { UserContext } from '../../context/UserContext';

// describe('ProtectedRoute', () => {
//   const TestComponent = () => <div>Protected Content</div>;
//   const LoginComponent = () => <div>Login Page</div>;

//   const mockUserContextValue = (user = null) => ({
//     user,
//     login: jest.fn(),
//     logout: jest.fn(),
//     updateUser: jest.fn(),
//     isAuthenticated: !!user,
//   });

//   const renderProtectedRoute = async (userType = 'student') => {
//     const user = userType ? { id: '1', type: userType, name: 'Test User' } : null;

//     render(
//       <UserContext.Provider value={mockUserContextValue(user)}>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/login" element={<LoginComponent />} />
//             <Route
//               path="/"
//               element={<ProtectedRoute component={TestComponent} />}
//             />
//           </Routes>
//         </BrowserRouter>
//       </UserContext.Provider>
//     );

//     // Wait for any state updates
//     await waitFor(() => {
//       expect(document.body).toBeInTheDocument();
//     });
//   };

//   it('renders protected content when user is authenticated and has correct role', async () => {
//     await renderProtectedRoute('student');
//     expect(screen.getByText('Protected Content')).toBeInTheDocument();
//   });

//   it('redirects to dashboard for incorrect role', async () => {
//     await renderProtectedRoute('admin');
//     expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
//     expect(document.body).toContainHTML('/admin');
//   });

//   it('redirects to login when user is not authenticated', async () => {
//     await renderProtectedRoute(null);
//     expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
//     expect(screen.getByText('Login Page')).toBeInTheDocument();
//   });
// });

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import ProtectedRoute from '../../components/ProtectedRoute';

const mockUserContextValue = (userType) => ({
  user: userType ? { id: '1', type: userType, name: 'Test User' } : null,
  login: jest.fn(),
  logout: jest.fn(),
  updateUser: jest.fn(),
  isAuthenticated: !!userType,
});

describe('ProtectedRoute', () => {
  const renderProtectedRoute = (userType, initialRoute) => {
    render(
      <UserContext.Provider value={mockUserContextValue(userType)}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/student" element={<ProtectedRoute component={() => <div>Student Dashboard</div>} />} />
            <Route path="/profile" element={<ProtectedRoute component={() => <div>Profile Page</div>} />} />
            <Route path="/company" element={<ProtectedRoute component={() => <div>Company Dashboard</div>} />} />
            <Route path="/admin" element={<ProtectedRoute component={() => <div>Admin Dashboard</div>} />} />
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    );
  };

  it('renders allowed content for valid user role', () => {
    renderProtectedRoute('student', '/student');
    expect(screen.getByText('Student Dashboard')).toBeInTheDocument();
  });

  it('redirects to login for unauthenticated users', () => {
    renderProtectedRoute(null, '/student');
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('redirects to default dashboard for unauthorized routes', () => {
    renderProtectedRoute('student', '/admin');
    expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument();
    expect(screen.getByText('Student Dashboard')).toBeInTheDocument(); // Redirected to student dashboard
  });

  it('renders another allowed route for valid user', () => {
    renderProtectedRoute('student', '/profile');
    expect(screen.getByText('Profile Page')).toBeInTheDocument();
  });
});
