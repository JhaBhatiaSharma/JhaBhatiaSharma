import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children }) => <div>{children}</div>,
  CardHeader: ({ children }) => <div>{children}</div>,
  CardTitle: ({ children }) => <div>{children}</div>,
  CardDescription: ({ children }) => <div>{children}</div>,
  CardContent: ({ children }) => <div>{children}</div>
}));

jest.mock('../../components/UserMenuDropdown', () => {
  return function DummyUserMenuDropdown() {
    return <div>User Menu</div>;
  };
});

jest.mock('../../pages/MessagingSystem', () => {
  return function DummyMessagingSystem() {
    return <div>Messaging System</div>;
  };
});

// Mock API
jest.mock('../../api', () => ({
  get: jest.fn(() => Promise.resolve({ data: { users: [], internships: [], complaints: [] } }))
}));

// Import the component after mocks
import AdminDashboard from '../../pages/AdminDashboard';

describe('AdminDashboard', () => {
  beforeEach(() => {
    // Mock localStorage
    global.localStorage = {
      getItem: jest.fn(() => 'fake-token'),
      setItem: jest.fn(),
      removeItem: jest.fn()
    };
  });

  test('renders without crashing', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  test('renders main sections', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('Generate Reports')).toBeInTheDocument();
  });
});