import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Bell, BarChart, Calendar, Plus, FileText } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Sarah Parker", position: "Frontend Developer", skills: ["React"], experience: "3 Years", status: "Pending" },
    { id: 2, name: "John Doe", position: "Backend Developer", skills: ["Node.js"], experience: "5 Years", status: "Pending" },
    { id: 3, name: "Alice Johnson", position: "Full Stack Developer", skills: ["React", "Node.js"], experience: "4 Years", status: "Pending" },
  ]);
  const [internships, setInternships] = useState([
    { id: 1, title: "Frontend Developer", location: "Remote", applicants: 50 },
    { id: 2, title: "Backend Developer", location: "New York", applicants: 30 },
    { id: 3, title: "Full Stack Developer", location: "San Francisco", applicants: 20 },
  ]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(null);
  const navigate = useNavigate();

  // Handle View Details
  const handleViewDetails = (applicant) => {
    setSelectedApplicant(applicant);
  };

  // Handle Schedule Interview
  const handleScheduleInterview = () => {
    if (selectedApplicant && scheduleDate) {
      console.log(`Scheduled interview for ${selectedApplicant.name} on ${scheduleDate}`);
      setShowScheduleModal(false);
      setScheduleDate(null);
    }
  };

  // Handle Reject Applicant
  const handleRejectApplicant = (id) => {
    const updatedApplicants = applicants.filter((applicant) => applicant.id !== id);
    setApplicants(updatedApplicants);
    setSelectedApplicant(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">TechCorp Dashboard</h1>
          <p className="text-gray-600">Manage your internship programs</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/add-internship')} className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600">
            <Plus className="h-5 w-5" />
            Post New Internship
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-6 w-6 text-gray-600" />
          </button>
          <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
            TC
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Positions</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Applicants</p>
                <h3 className="text-2xl font-bold">156</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Scheduled Interviews</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Hired This Month</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Internships Section */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Open Internships</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {internships.map((internship) => (
                <div key={internship.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <h4 className="font-semibold">{internship.title}</h4>
                  <p className="text-sm text-gray-600">{internship.location}</p>
                  <p className="text-sm text-gray-600">{internship.applicants} Applicants</p>
                  <button
                    onClick={() => navigate(`/internships/${internship.id}`)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Review and manage candidate applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applicants.map((applicant) => (
                  <div key={applicant.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{applicant.name}</h4>
                          <p className="text-sm text-gray-600">{applicant.position}</p>
                          <div className="flex gap-2 mt-2">
                            {applicant.skills.map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">{skill}</span>
                            ))}
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">{applicant.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(applicant)}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm hover:bg-gray-200"
                      >
                      View Details
                      </button>
                        <button
                          onClick={() => {
                            setSelectedApplicant(applicant);
                            setShowScheduleModal(true);
                          }}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                        >
                          Schedule
                        </button>
                        <button
                          onClick={() => handleRejectApplicant(applicant.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Interviews */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Today's Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex gap-4">
                    <div className="p-2 bg-gray-100 rounded">
                      <Calendar className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">John Doe</h4>
                      <p className="text-sm text-gray-600">Backend Developer</p>
                      <p className="text-sm text-blue-600 mt-1">2:00 PM - 3:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold">Schedule Interview</h2>
            <p className="text-sm text-gray-600">For: {selectedApplicant.name}</p>
            <div className="mt-4">
            <DatePicker
              selected={scheduleDate}
              onChange={(date) => setScheduleDate(date)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-white text-gray-800"
            />

            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleScheduleInterview}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedApplicant && !showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold">Applicant Details</h2>
            <p className="text-sm text-gray-600">
              <strong>Name:</strong> {selectedApplicant.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Position:</strong> {selectedApplicant.position}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Experience:</strong> {selectedApplicant.experience}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Skills:</strong> {selectedApplicant.skills.join(", ")}
            </p>
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
