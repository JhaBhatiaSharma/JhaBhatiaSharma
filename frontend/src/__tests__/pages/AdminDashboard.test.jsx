import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';

// First mock all the components and APIs
jest.mock('@/components/ui/card', () => ({
  Card: ({ children }) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }) => <div>{children}</div>,
  CardTitle: ({ children }) => <div>{children}</div>,
  CardDescription: ({ children }) => <div>{children}</div>,
  CardContent: ({ children }) => <div>{children}</div>
}));

jest.mock('../../components/UserMenuDropdown', () => {
  return function DummyUserMenuDropdown() {
    return <div data-testid="user-menu">User Menu</div>;
  };
});

jest.mock('../../pages/MessagingSystem', () => {
  return function DummyMessagingSystem() {
    return <div data-testid="messaging-system">Messaging System</div>;
  };
});

// Mock API before importing the component
jest.mock('../../api', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      users: [
        {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          role: 'student',
          status: 'active'
        }
      ],
      internships: [],
      complaints: []
    }
  })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} }))
}));

// Import the component after all mocks are set up
import AdminDashboard from '../../pages/AdminDashboard';
import API from '../../api';

describe('AdminDashboard', () => {
  beforeEach(() => {
    // Mock localStorage
    global.localStorage = {
      getItem: jest.fn(() => 'fake-token'),
      setItem: jest.fn(),
      removeItem: jest.fn()
    };

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders basic dashboard elements', async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    expect(screen.getByText('University Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Welcome back, Admin')).toBeInTheDocument();
    expect(screen.getByText('Add User')).toBeInTheDocument();
  });

  test('handles user search', async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    const searchInput = screen.getByPlaceholderText('Search users...');
    const searchButton = screen.getByText('Search');

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test' } });
      fireEvent.click(searchButton);
    });

    expect(API.get).toHaveBeenCalled();
  });

  test('opens messaging system', async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    const messagingButton = screen.getByText('Open Messaging');
    
    await act(async () => {
      fireEvent.click(messagingButton);
    });

    expect(screen.getByTestId('messaging-system')).toBeInTheDocument();
  });

  test('opens add user modal', async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    const addButton = screen.getByText('Add User');
    
    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Add New User')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    });
  });

  test('renders stats cards', async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    await waitFor(() => {
      expect(screen.getByText('Total Users')).toBeInTheDocument();
      expect(screen.getByText('Posted Internships')).toBeInTheDocument();
      expect(screen.getByText('Complaints')).toBeInTheDocument();
    });
  });

  test('can filter users', async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    const searchInput = screen.getByPlaceholderText('Search users...');
    
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'John' } });
    });

    expect(searchInput.value).toBe('John');
  });
});