import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddInternship = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    duration: '',
    stipend: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/add-internship', formData, {
        headers: { usertype: 'recruiter' },
      });
      alert('Internship added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding internship:', error);
      alert('Failed to add internship');
    }
  };
  const handleCancel = () => {
    navigate('/company'); // Navigate back to the dashboard
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Post New Internship</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Duration (in months)"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Stipend (in USD)"
            value={formData.stipend}
            onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
            required
          />
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Post Internship
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInternship;
