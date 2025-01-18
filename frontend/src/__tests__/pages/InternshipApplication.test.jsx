import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InternshipDetails from '../../Pages/InternshipApplication';

// Mock the UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
  CardHeader: ({ children }) => <div>{children}</div>,
  CardTitle: ({ children }) => <div className="card-title">{children}</div>,
  CardDescription: ({ children }) => <div className="card-description">{children}</div>,
  CardContent: ({ children }) => <div>{children}</div>,
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Building2: () => <div data-testid="building-icon" />,
  MapPin: () => <div data-testid="map-pin-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  Users: () => <div data-testid="users-icon" />,
  ChevronLeft: () => <div data-testid="chevron-left-icon" />,
  Share2: () => <div data-testid="share-icon" />,
}));

describe('InternshipDetails', () => {
  beforeEach(() => {
    render(<InternshipDetails />);
  });

  test('renders main heading and company name', () => {
    expect(screen.getByText('Software Developer Intern')).toBeInTheDocument();
    expect(screen.getByText('TechCorp Inc.')).toBeInTheDocument();
  });

  test('displays back to search button', () => {
    const backButton = screen.getByText('Back to Search');
    expect(backButton).toBeInTheDocument();
    expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument();
  });

  test('displays key internship details', () => {
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('6 months')).toBeInTheDocument();
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('June 2024')).toBeInTheDocument();
    expect(screen.getByText('5 openings')).toBeInTheDocument();
  });

  test('displays all section headings', () => {
    expect(screen.getByText('About the Role')).toBeInTheDocument();
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByText('Benefits')).toBeInTheDocument();
  });

  test('displays application buttons', () => {
    expect(screen.getByText('Quick Apply with Profile')).toBeInTheDocument();
    expect(screen.getByText('Custom Application')).toBeInTheDocument();
  });

  test('shows skills match percentage', () => {
    expect(screen.getByText('Skills Match')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  test('displays company information', () => {
    expect(screen.getByText('About TechCorp Inc.')).toBeInTheDocument();
    expect(screen.getByText(/Leading technology company/)).toBeInTheDocument();
    expect(screen.getByText('View Company Profile')).toBeInTheDocument();
  });

  test('displays all required skills', () => {
    const requirements = [
      'Currently pursuing a degree in Computer Science or related field',
      'Strong understanding of web technologies and programming concepts',
      'Experience with React, Node.js, and modern JavaScript',
      'Excellent problem-solving and analytical skills',
      'Strong communication and teamwork abilities'
    ];

    requirements.forEach(requirement => {
      expect(screen.getByText(requirement)).toBeInTheDocument();
    });
  });

  test('displays all benefits', () => {
    const benefits = [
      'Competitive stipend',
      'Flexible work hours',
      'Mentorship from senior developers',
      'Opportunity for full-time conversion',
      'Learning and development resources'
    ];

    benefits.forEach(benefit => {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    });
  });

  test('displays correct icons', () => {
    const uniqueIcons = [
      'map-pin-icon',
      'clock-icon',
      'calendar-icon',
      'users-icon',
      'chevron-left-icon',
      'share-icon'
    ];

    uniqueIcons.forEach(icon => {
      expect(screen.getByTestId(icon)).toBeInTheDocument();
    });

    // Test building icon separately since it appears multiple times
    expect(screen.getAllByTestId('building-icon')).toHaveLength(2);
  });

  test('displays skills match progress bar', () => {
    // Find the container by looking for the heading first
    const skillsMatch = screen.getByText('Skills Match');
    // Get the parent div that contains the progress bar
    const progressContainer = skillsMatch.closest('.bg-green-50');
    // Find the progress bar within the container
    const progressBar = progressContainer.querySelector('.bg-green-600');
    
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ width: '85%' });
  });

  test('verifies the sidebar content', () => {
    const sidebarContent = screen.getByText('Apply Now');
    expect(sidebarContent).toBeInTheDocument();
    expect(sidebarContent.closest('[data-testid="card"]')).toBeTruthy();
  });
});