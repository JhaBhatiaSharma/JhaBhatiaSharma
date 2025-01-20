import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Bell, BarChart, Calendar, Plus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import UserMenuDropdown from '../../components/UserMenuDropdown';
import MessagingSystem from '../MessagingSystem';

const CompanyDashboard = () => {
  const [internships, setInternships] = useState([]);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [uniqueApplicants, setUniqueApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch internships for the recruiter
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await API.get('/internships/recruiter/list');
        setInternships(response.data);
      } catch (error) {
        console.error('Error fetching internships:', error.response?.data?.message || error.message);
      }
    };
    fetchInternships();
  }, []);

  // Fetch all interviews for the recruiter
  useEffect(() => {
    const fetchAllInterviews = async () => {
      try {
        const response = await API.get('/internships/recruiter/interviews', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setScheduledInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error.response?.data?.message || error.message);
      }
    };
    fetchAllInterviews();
  }, []);

  

  // Fetch applicants for recruiter internships
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await API.get('/internships/applicants', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setApplicants(response.data);
      } catch (error) {
        console.error('Error fetching applicants:', error.response?.data?.message || error.message);
      }
    };
    fetchApplicants();
  }, []);

  useEffect(() => {
    const getUniqueApplicants = (applicants) => {
      const seen = new Set();
      return applicants.filter((applicant) => {
        if (seen.has(applicant.email)) {
          return false;
        }
        seen.add(applicant.email);
        return true;
      });
    };
    setUniqueApplicants(getUniqueApplicants(applicants));
  }, [applicants]);

  const handleScheduleInterview = async () => {
    if (!selectedApplicant || !scheduleDate) {
      console.error("Selected applicant or schedule date is missing");
      return;
    }

    try {
      const { internshipId, applicantId } = selectedApplicant;
      if (!internshipId) {
        console.error("Internship ID is missing");
        return;
      }

      await API.post(`/internships/${internshipId}/schedule`, {
        applicantId,
        scheduleDate,
      });

      setShowScheduleModal(false);
      setScheduleDate(null);
      alert("Interview scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling interview:", error.response?.data?.message || error.message);
      alert("Failed to schedule interview. Please try again.");
    }
  };

  const handleMarkAsCompleted = async (internshipId, studentId) => {
    try {
      await API.patch(`/internships/${internshipId}/interviews/${studentId}/completed`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setScheduledInterviews((prev) =>
        prev.filter((interview) =>
          !(interview.student._id === studentId && interview.internshipId === internshipId)
        )
      );
      alert('Interview marked as completed!');
    } catch (error) {
      console.error('Error marking interview as completed:', error.response?.data?.message || error.message);
      alert('Failed to mark interview as completed. Please try again.');
    }
  };

  const today = new Date().toDateString();
  const todaysInterviews = scheduledInterviews.filter(
    (interview) => new Date(interview.dateTime).toDateString() === today
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 w-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">TechCorp Dashboard</h1>
          <p className="text-gray-600">Manage your internship programs</p>
        </div>
        <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMessagingOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Open Messaging
        </button>
        <MessagingSystem
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
      />
          <button onClick={() => navigate('/add-internship')} className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600">
            <Plus className="h-5 w-5" />
            Post New Internship
          </button>
         
          <UserMenuDropdown role="company" initials="TC" />
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
                <h3 className="text-2xl font-bold">{internships.length}</h3>
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
                <h3 className="text-2xl font-bold">{uniqueApplicants.length}</h3>
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
                <h3 className="text-2xl font-bold">{scheduledInterviews.length}</h3>
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
      <div className="grid grid-cols-3 gap-8">
  {/* Left Column */}
  <div className="col-span-2">
    {/* Posted Internships */}
    <div className="mb-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Posted Internships</CardTitle>
        </CardHeader>
        <CardContent>
          {internships.length > 0 ? (
            <div className="space-y-4">
              {internships.map((internship) => (
                <div key={internship._id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <h4 className="font-semibold">{internship.title}</h4>
                  <p className="text-sm text-gray-600">Location: {internship.location}</p>
                  <p className="text-sm text-gray-600">
                    Applicants: {internship.applicants?.length || 0}
                  </p>
                  <button
                    onClick={() => navigate(`/internships/${internship._id}`)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No internships posted yet. Start by posting one!</p>
          )}
        </CardContent>
      </Card>
    </div>

    {/* Recent Applications */}
    <div className="mb-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Review and manage candidate applications</CardDescription>
        </CardHeader>
        <CardContent>
          {applicants.length > 0 ? (
            <div className="space-y-4">
              {applicants.map((applicant, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{`${applicant.firstName} ${applicant.lastName}`}</h4>
                      <p className="text-sm text-gray-600">{applicant.internshipTitle}</p>
                      <div className="flex gap-2 mt-2">
                        {applicant.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      {applicant.scheduledDateTime && (
                        <p className="text-sm text-green-600 mt-2">
                          Scheduled: {new Date(applicant.scheduledDateTime).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedApplicant(applicant);
                          setShowScheduleModal(true);
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                      >
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No applications received yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  </div>

  {/* Right Column */}
  <div>
    {/* Today's Interviews */}
    <div className="mb-8">
  <Card className="shadow-md">
    <CardHeader>
      <CardTitle className="text-lg font-bold">Today's Interviews</CardTitle>
    </CardHeader>
    <CardContent>
      {todaysInterviews.length > 0 ? (
        <div className="space-y-4">
          {todaysInterviews.map((interview) => (
            <div
              key={interview.student._id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                {/* Icon Section */}
                <div className="flex-shrink-0 p-3 bg-gray-100 rounded-full">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>

                {/* Content Section */}
                <div className="flex-grow">
                  <h4 className="text-base font-semibold text-gray-800">
                    {`${interview.student.firstName} ${interview.student.lastName}`}
                  </h4>
                  <p className="text-sm text-gray-500">{interview.internshipTitle}</p>
                  <p className="text-sm text-blue-500 mt-1">
                    {new Date(interview.dateTime).toLocaleString()}
                  </p>
                </div>

                {/* Action Section */}
                <div>
                  <button
                    onClick={() =>
                      handleMarkAsCompleted(interview.internshipId, interview.student._id)
                    }
                    className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No interviews scheduled for today.</p>
      )}
    </CardContent>
  </Card>
</div>


    {/* All Scheduled Interviews */}
    <div>
  <Card className="shadow-md">
    <CardHeader>
      <CardTitle className="text-lg font-bold">All Scheduled Interviews</CardTitle>
    </CardHeader>
    <CardContent>
      {scheduledInterviews.length > 0 ? (
        <div className="space-y-4">
          {scheduledInterviews.map((interview) => (
            <div
              key={interview.student._id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                {/* Icon Section */}
                <div className="flex-shrink-0 p-3 bg-gray-100 rounded-full">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>

                {/* Content Section */}
                <div className="flex-grow">
                  <h4 className="text-base font-semibold text-gray-800">
                    {`${interview.student.firstName} ${interview.student.lastName}`}
                  </h4>
                  <p className="text-sm text-gray-500">{interview.internshipTitle}</p>
                  <p className="text-sm text-blue-500 mt-1">
                    {new Date(interview.dateTime).toLocaleString()}
                  </p>
                </div>

                {/* Action Section */}
                <div>
                  <button
                    onClick={() =>
                      handleMarkAsCompleted(interview.internshipId, interview.student._id)
                    }
                    className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No interviews scheduled yet.</p>
      )}
    </CardContent>
  </Card>
</div>

  </div>
</div>


      {/* Schedule Modal */}
      {showScheduleModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800">Schedule Interview</h2>
            <p className="text-sm text-gray-600 mt-1">
              For: <span className="font-medium">{`${selectedApplicant.firstName} ${selectedApplicant.lastName}`}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Internship: <span className="font-medium">{selectedApplicant.internshipTitle}</span>
            </p>
            <div className="mt-4">
              <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-800 mb-2">
                Select Date and Time
              </label>
              <DatePicker
                id="scheduleDate"
                selected={scheduleDate}
                onChange={(date) => setScheduleDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-white text-gray-800"
              />
            </div>
            <div className="flex gap-4 mt-6 justify-end">
              <button
                onClick={handleScheduleInterview}
                className={`px-4 py-2 text-white rounded-lg ${
                  scheduleDate
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-green-300 cursor-not-allowed'
                }`}
                disabled={!scheduleDate}
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowScheduleModal(false);
                  setScheduleDate(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;

