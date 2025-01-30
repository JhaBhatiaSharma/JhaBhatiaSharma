import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import CVBuilder from '../../pages/CVBuilder';

// Mock API
jest.mock('../../api', () => ({
  post: jest.fn(() => Promise.resolve({ data: { success: true } }))
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  X: () => <div data-testid="x-icon">X</div>,
  Plus: () => <div data-testid="plus-icon">Plus</div>,
  FileText: () => <div data-testid="file-text-icon">FileText</div>
}));

describe('CVBuilder', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    // Mock localStorage
    global.localStorage = {
      getItem: jest.fn(() => 'fake-user-id'),
      setItem: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders nothing when not open', () => {
    const { container } = render(<CVBuilder isOpen={false} onClose={mockOnClose} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders main form sections when open', async () => {
    render(<CVBuilder isOpen={true} onClose={mockOnClose} />);

    // Find main sections by role and heading level
    const sections = screen.getAllByRole('heading', { level: 3 }).map(h => h.textContent);
    expect(sections).toContain('Personal Information');
    expect(sections).toContain('Skills');

    // Find the form elements
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Save CV')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('handles personal information input', async () => {
    render(<CVBuilder isOpen={true} onClose={mockOnClose} />);

    const inputs = {
      name: screen.getByPlaceholderText('Full Name'),
      email: screen.getByPlaceholderText('Email'),
      phone: screen.getByPlaceholderText('Phone'),
      location: screen.getByPlaceholderText('Location')
    };

    await act(async () => {
      fireEvent.change(inputs.name, { target: { value: 'John Doe' } });
      fireEvent.change(inputs.email, { target: { value: 'john@example.com' } });
      fireEvent.change(inputs.phone, { target: { value: '1234567890' } });
      fireEvent.change(inputs.location, { target: { value: 'New York' } });
    });

    Object.values(inputs).forEach(input => {
      expect(input).toHaveValue();
    });
  });

  test('allows adding and removing skills', async () => {
    render(<CVBuilder isOpen={true} onClose={mockOnClose} />);

    const skillInput = screen.getByPlaceholderText('Add a skill');
    const addButton = screen.getByRole('button', { name: 'Add' });

    // Add first skill
    await act(async () => {
      fireEvent.change(skillInput, { target: { value: 'JavaScript' } });
      fireEvent.click(addButton);
    });

    // Find skill in both form and preview sections
    const skillsSection = screen.getAllByRole('heading', { level: 3 })
      .find(h => h.textContent === 'Skills')
      ?.parentElement;
    expect(within(skillsSection).getByText('JavaScript')).toBeInTheDocument();

    // Remove skill
    const removeButton = screen.getByTestId('x-icon');
    await act(async () => {
      fireEvent.click(removeButton);
    });

    // Verify skill is removed
    expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
  });

  test('allows template switching', async () => {
    render(<CVBuilder isOpen={true} onClose={mockOnClose} />);

    const professionalBtn = screen.getByRole('button', { name: 'Professional' });
    const creativeBtn = screen.getByRole('button', { name: 'Creative' });

    expect(professionalBtn).toHaveClass('bg-blue-600');
    expect(creativeBtn).not.toHaveClass('bg-blue-600');

    await act(async () => {
      fireEvent.click(creativeBtn);
    });

    expect(professionalBtn).not.toHaveClass('bg-blue-600');
    expect(creativeBtn).toHaveClass('bg-blue-600');
  });

  test('handles CV submission', async () => {
    const mockAPI = require('../../api');
    render(<CVBuilder isOpen={true} onClose={mockOnClose} />);

    // Fill form
    const nameInput = screen.getByPlaceholderText('Full Name');
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    });

    // Submit form
    const submitButton = screen.getByRole('button', { name: 'Save CV' });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockAPI.post).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('allows adding education entries', async () => {
    render(<CVBuilder isOpen={true} onClose={mockOnClose} />);

    const addButton = screen.getByText('+ Add Education');
    const initialCount = screen.getAllByPlaceholderText('School/University').length;

    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(screen.getAllByPlaceholderText('School/University')).toHaveLength(initialCount + 1);
  });
});