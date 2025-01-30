//frontend/src/lib/mockData.jsx
export const mockData = {
  students: [
    { id: 1, name: "John Doe", role: "Student", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Student", status: "Inactive" },
  ],
  companies: [
    { id: 1, name: "TechCorp", activePositions: 5 },
    { id: 2, name: "WebSolutions", activePositions: 3 },
  ],
  internships: [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "San Francisco",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "WebSolutions",
      location: "New York",
    },
  ],
};
