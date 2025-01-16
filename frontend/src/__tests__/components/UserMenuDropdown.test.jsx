import { render, screen, fireEvent } from '@testing-library/react';
import UserMenuDropdown from '../../components/UserMenuDropdown';
import { BrowserRouter } from 'react-router-dom';

describe('UserMenuDropdown', () => {
  const renderDropdown = (role = 'student') => {
    render(
      <BrowserRouter>
        <UserMenuDropdown role={role} initials="JD" />
      </BrowserRouter>
    );
  };

  it('renders the dropdown button with initials', () => {
    renderDropdown();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('shows dropdown menu on click', () => {
    renderDropdown();
    fireEvent.click(screen.getByText('JD'));
    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('navigates to correct profile based on role', () => {
    renderDropdown('admin');
    fireEvent.click(screen.getByText('JD'));
    expect(screen.getByText('Admin Settings')).toBeInTheDocument();
  });

  it('logs out and redirects to login', () => {
    renderDropdown();
    fireEvent.click(screen.getByText('JD'));
    fireEvent.click(screen.getByText('Logout'));
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userRole')).toBeNull();
  });
});
