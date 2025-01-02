// frontend/src/Pages/Company/InternshipDetails.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InternshipDetails = () => {
  const [allInternships, setAllInternships] = useState([]);
  const navigate = useNavigate();

  // Fetch all internships
  useEffect(() => {
    const fetchAllInternships = async () => {
      try {
        const recruiterId = "1234"; // Replace with actual recruiter ID
        const response = await axios.get(`/fetch_all-internship?id=${recruiterId}`, {
          headers: { usertype: 'recruiter' }, // Adjust headers as required
        });
        setAllInternships(response.data.data);
      } catch (error) {
        console.error('Error fetching all internships:', error);
        alert('Failed to fetch internships');
      }
    };
    fetchAllInternships();
  }, []);
  

  if (allInternships.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading internships...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">All Internships</h1>
          <p className="text-gray-600 mt-2">Explore all available internship opportunities</p>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allInternships.map((internship) => (
            <div
              key={internship.id}
              onClick={() => navigate(`/internship/${internship.id}`)}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">{internship.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-3">{internship.description}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Location: {internship.location}</p>
                <p className="text-sm text-gray-500">Duration: {internship.duration} months</p>
                <p className="text-sm text-gray-500">Stipend: ${internship.stipend}</p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;


