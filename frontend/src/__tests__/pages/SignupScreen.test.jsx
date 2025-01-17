import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react'; // Correctly use act from react
import API from '../../api';
import SignupScreen from '../../Pages/SignupScreen';

jest.mock('../../api');

describe('SignupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  test('renders SignupScreen correctly', () => {
    render(
      <Router>
        <SignupScreen />
      </Router>
    );

    // Use `getByRole` to differentiate between elements
    expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Create password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    API.post.mockResolvedValueOnce({ data: { message: 'Signup successful!' } });

    render(
      <Router>
        <SignupScreen />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter first name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Create password'), { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: 'Create Account' });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(window.alert).toHaveBeenCalledWith('Signup successful! Please log in.');
    expect(API.post).toHaveBeenCalledWith('/auth/student/register', {
      email: 'john.doe@example.com',
      password: 'password123',
      type: 'student',
      firstName: 'John',
      lastName: 'Doe',
      profile: { university: '' },
    });
  });

  test('handles API errors gracefully', async () => {
    API.post.mockRejectedValueOnce({ response: { data: { message: 'Signup failed.' } } });

    render(
      <Router>
        <SignupScreen />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter first name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Create password'), { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: 'Create Account' });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(window.alert).toHaveBeenCalledWith('Signup failed.');
  });
});
