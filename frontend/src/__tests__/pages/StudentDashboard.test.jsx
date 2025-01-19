import React from 'react';
import { render, screen } from '@testing-library/react';
import StudentDashboard from '../../Pages/StudentDashboard';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';

// Mock the components that are imported
jest.mock('../../Pages/CVBuilder', () => () => <div data-testid="cv-builder">CV Builder</div>);
jest.mock('../../Pages/MessagingSystem', () => () => <div data-testid="messaging-system">Messaging System</div>);
jest.mock('../../components/UserMenuDropdown', () => () => <div data-testid="user-menu">User Menu</div>);
jest.mock('react-datepicker', () => () => <div data-testid="date-picker">Date Picker</div>);

// Mock the API calls
jest.mock('../../api', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

// Mock the UserContext
jest.mock('../../context/UserContext', () => ({
  ...jest.requireActual('../../context/UserContext'),
  useUser: () => ({
    user: {
      _id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      type: 'student',
      profile: {
        degree: 'Computer Science'
      }
    },
    loading: false
  })
}));

describe('StudentDashboard', () => {
  beforeEach(() => {
    // Wrap the component with both UserProvider and BrowserRouter
    render(
      <UserProvider>
        <BrowserRouter>
          <StudentDashboard />
        </BrowserRouter>
      </UserProvider>
    );
  });

  test('renders basic dashboard elements', () => {
    // Test header content
    expect(screen.getByText('Welcome, John!')).toBeInTheDocument();
    expect(screen.getByText('Computer Science Student')).toBeInTheDocument();

    // Test main action buttons
    expect(screen.getByText('Build CV')).toBeInTheDocument();

    // Test stats sections labels
    expect(screen.getByText('Active Applications')).toBeInTheDocument();
    expect(screen.getByText('Completed Interviews')).toBeInTheDocument();
    expect(screen.getByText('New Messages')).toBeInTheDocument();

    // Test main sections
    expect(screen.getByText('Recent Internship Matches')).toBeInTheDocument();
    expect(screen.getByText('Based on your profile and preferences')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Interviews')).toBeInTheDocument();
  });
});