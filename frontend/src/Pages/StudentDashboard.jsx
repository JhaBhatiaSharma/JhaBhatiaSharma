import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, MessageSquare, Bell, FileText, Sparkles, MapPin, MessageCircleCodeIcon } from 'lucide-react';
import CVBuilder from './CVBuilder';
import MessagingSystem from './MessagingSystem';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../api';
import UserMenuDropdown from '../components/UserMenuDropdown';

const StudentDashboard = () => {
  const [showCVBuilder, setShowCVBuilder] = useState(false);
  const [hasCV, setHasCV] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState(null);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showActiveInternshipsModal, setShowActiveInternshipsModal] = useState(false);
  const [activeInternships, setActiveInternships] = useState([]);
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [recommendedInternships, setRecommendedInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCompletedDialog,setShowCompletedDialog]=useState(false)
  const [completedInterviews, setCompletedInterviews] = useState([]);
  // Complaint states
  const [showComplaintsModal, setShowComplaintsModal] = useState(false);
  const [showNewComplaintModal, setShowNewComplaintModal] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({ title: '', description: '' });

  const stats = [
    { icon: Briefcase, label: 'Active Applications', value: activeInternships.length },
    { icon: Calendar, label: 'Completed Interviews', value: completedInterviews.length },
    { icon: MessageSquare, label: 'New Messages', value: 3 },
    { icon: MessageCircleCodeIcon, label: 'Complaints', value: complaints.length}
  ];

  const fetchCompletedInterviews = async () => {
    try {
      const response = await API.get('/internships/student/completed-interviews', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log("completed interviews:",response.data)
      setCompletedInterviews(response.data);
    } catch (error) {
      console.error('Error fetching completed interviews:', error.response?.data?.message || error.message);
    }
  };
  const handleCompletedClick = () => {
    fetchCompletedInterviews(); // Fetch the data when the card is clicked
    setShowCompletedDialog(true); // Open the dialog
  };

  const handleReschedule = () => {
    console.log(`Rescheduled ${selectedInterview?.role} to ${rescheduleDate}`);
    setSelectedInterview(null);
  };

  const handleCancel = () => {
    console.log(`Canceled interview for ${selectedInterview?.role}`);
    setSelectedInterview(null);
  };

  const fetchRecommendations = async () => {
    try {
      setIsLoading(true);
      const response = await API.get('/internships/recommended');
      setRecommendedInternships(response.data.recommendations);
      setError(null);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError(error.response?.data?.message || 'Failed to fetch recommendations');
      setRecommendedInternships([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await API.get('/internships/allinternships');
        setInternships(response.data);
      } catch (error) {
        console.error('Error fetching internships:', error.response?.data?.message || error.message);
      }
    };

    const fetchActiveInternships = async () => {
      try {
        const response = await API.get('/internships/my-internships');
        console.log(response);
        setActiveInternships(response.data);
      } catch (error) {
        console.error('Error fetching active internships:', error.response?.data?.message || error.message);
      }
    };

    fetchInternships();
    fetchActiveInternships();
  }, []);

  const checkCV = async () => {
    try {
      const response = await API.get('/cv/latest');
      setHasCV(!!response.data);
      if (response.data) {
        fetchRecommendations();
      }
    } catch (error) {
      setHasCV(false);
      console.error('Error checking CV:', error);
    }
  };

  const handleCVBuilderClose = () => {
    setShowCVBuilder(false);
    // Refresh recommendations when CV builder is closed
    checkCV();
  };

  useEffect(() => {
    const fetchScheduledInterviews = async () => {
      try {
        const response = await API.get('/internships/student/interviews', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Scheduled Interviews Response:', response.data);
        setScheduledInterviews(response.data);
      } catch (error) {
        console.error('Error fetching scheduled interviews:', error.response?.data?.message || error.message);
      }
    };
  
    fetchScheduledInterviews();
  }, []);

  useEffect(() => {
    const checkCVAndFetchRecommendations = async () => {
      try {
        const cvResponse = await API.get('/cv/latest');
        setHasCV(!!cvResponse.data);
        
        if (cvResponse.data) {
          // Only fetch recommendations if user has a CV
          fetchRecommendations();
        }
      } catch (error) {
        setHasCV(false);
        console.error('Error checking CV:', error);
      }
    };
  
    checkCVAndFetchRecommendations();
  }, []); // Empty dependency array means this runs once on mount
  
  const getMatchScoreColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const handleApplyClick = (internship) => {
    setSelectedInternship(internship);
    setShowApplyModal(true);
  };

  const handleConfirmApply = async () => {
    if (!selectedInternship) return;

    try {
      await API.post(`/internships/${selectedInternship._id}/apply`);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying to internship:', error.response?.data?.message || error.message);
      alert('Failed to apply. Please try again.');
    } finally {
      setShowApplyModal(false);
      setSelectedInternship(null);
    }
  };

  // complaint functions
  const fetchComplaints = async () => {
    try {
      const response = await API.get('/complaints/my-complaints');
      setComplaints(response.data.data);
    } catch (error) {
      console.error('Error fetching complaints:', error.response?.data?.message || error.message);
    }
  };

  const handleNewComplaintSubmit = async () => {
    try {
      await API.post('/complaints/create-complaint', {
        title: newComplaint.title,
        description: newComplaint.description
      });
      alert('Complaint submitted successfully');
      setShowNewComplaintModal(false);
      setNewComplaint({ title: '', description: '' });
      fetchComplaints(); // Refresh complaints list
    } catch (error) {
      console.error('Error submitting complaint:', error.response?.data?.message || error.message);
      alert('Failed to submit complaint. Please try again.');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-[#1E1E1E]">Welcome, John!</h1>
          <p className="text-[#666]">Computer Science Student</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowCVBuilder(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#4A72FF] text-white rounded-lg hover:bg-[#3A5FE6]"
          >
            <FileText className="h-4 w-4" />
            Build CV
          </button>
          <button 
            onClick={() => setShowMessaging(true)}
            className="p-2 rounded-full hover:bg-gray-100 relative"
          >
            <MessageSquare className="h-6 w-6 text-[#666]" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-6 w-6 text-[#666]" />
          </button>
          <UserMenuDropdown />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-4 flex items-center cursor-pointer"
              onClick={() => {
                if (index === 0) {
                  setShowActiveInternshipsModal(true);
                }
                if (index === 1) {
                   // Fetch completed interviews when the stat is clicked
                  handleCompletedClick();
                }
                if (index === 3){
                  setShowComplaintsModal(true);
                }
              }}
            >
              <div
                className={`p-2 rounded-lg ${
                  index === 0
                    ? 'bg-blue-50'
                    : index === 1
                    ? 'bg-green-50'
                    : 'bg-purple-50'
                }`}
              >
                <Icon
                  className={`h-6 w-6 ${
                    index === 0
                      ? 'text-blue-500'
                      : index === 1
                      ? 'text-green-500'
                      : 'text-purple-500'
                  }`}
                />
              </div>
              <div className="ml-4">
                <p className="text-sm text-[#666]">{stat.label}</p>
                <p className="text-2xl font-semibold text-[#1E1E1E]">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completed Interviews Dialog */}
      {showCompletedDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold text-[#1E1E1E] mb-4">Completed Interviews</h2>
            {completedInterviews.length > 0 ? (
              <div className="space-y-4">
                {completedInterviews.map((interview, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[#E5E7EB] rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex gap-4">
                      <div className="p-2 bg-gray-50 rounded">
                        <Calendar className="h-6 w-6 text-[#666]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1E1E1E]">{interview.internshipTitle}</h3>
                        <p className="text-sm text-[#666]">{interview.company}</p>
                        <p className="text-sm text-[#4A72FF] mt-1">
                          {new Date(interview.dateTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No completed interviews yet.</p>
            )}
            <button
              onClick={() => setShowCompletedDialog(false)}
              className="mt-4 px-4 py-2 bg-gray-300 text-[#666] rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

       {/* Complaints Modal */}
       {showComplaintsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold text-[#1E1E1E] mb-4">Your Complaints</h2>
            <div className="space-y-4">
              {complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <div key={complaint._id} className="p-4 border border-gray-300 rounded-lg">
                    <h3 className="font-medium text-[#1E1E1E]">{complaint.title}</h3>
                    <p className="text-sm text-[#666]">{complaint.description}</p>
                    <p className="text-sm text-gray-500">Status: {complaint.status}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No complaints found.</p>
              )}
            </div>
            <button
              onClick={() => setShowNewComplaintModal(true)}
              className="mt-4 px-4 py-2 bg-[#4A72FF] text-white rounded-lg hover:bg-[#3A5FE6]"
            >
              New Complaint
            </button>
            <button
              onClick={() => setShowComplaintsModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 text-[#666] rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* New Complaint Modal */}
      {showNewComplaintModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold text-[#1E1E1E] mb-4">New Complaint</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Complaint Title"
                value={newComplaint.title}
                onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-white"
              />
              <textarea
                placeholder="Complaint Description"
                value={newComplaint.description}
                onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-white"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleNewComplaintSubmit}
                className="px-4 py-2 bg-[#4A72FF] text-white rounded-lg hover:bg-[#3A5FE6]"
              >
                Submit
              </button>
              <button
                onClick={() => setShowNewComplaintModal(false)}
                className="px-4 py-2 bg-gray-300 text-[#666] rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Internship Matches */}
<div className="lg:col-span-2">
  <div className="bg-white rounded-xl p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold text-[#1E1E1E]">Recent Internship Matches</h2>
        <p className="text-[#666] text-sm">Based on your profile and preferences</p>
      </div>
      <button
        onClick={() => fetchRecommendations()}
        className="p-2 text-gray-400 hover:text-gray-600"
        title="Refresh recommendations"
      >
        <Sparkles className="w-5 h-5" />
      </button>
    </div>

    {!hasCV ? (
  <div className="text-center py-8">
    <div className="mb-4">
      <FileText className="h-12 w-12 text-gray-400 mx-auto" />
    </div>
    <p className="text-gray-600 mb-4">
      Please create a CV first to get personalized recommendations
    </p>
    <button
      onClick={() => setShowCVBuilder(true)}
      className="px-4 py-2 bg-[#4A72FF] text-white rounded-lg hover:bg-[#3A5FE6]"
    >
      Build CV Now
    </button>
  </div>
) : isLoading ? (
  <div className="flex justify-center items-center h-40">
    <div className="text-gray-500">Loading recommendations...</div>
  </div>
) : error ? (
  <div className="text-red-500 text-center p-4">{error}</div>
) : recommendedInternships.length === 0 ? (
  <div className="text-center py-8">
    <p className="text-gray-500">No matching internships found.</p>
    <p className="text-sm text-gray-400">
      Try updating your CV with more skills.
    </p>
  </div>
    ) : (
      <div className="space-y-4">
        {recommendedInternships.map((internship) => (
          <div key={internship._id} className="p-4 border border-[#E5E7EB] rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-[#1E1E1E]">{internship.title}</h3>
                <p className="text-sm text-[#666]">{internship.recruiter?.companyName}</p>
                
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${getMatchScoreColor(internship.matchScore)}`}>
                    {Math.round(internship.matchScore)}% Match
                  </span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {internship.location}
                  </span>
                  {internship.stipend && (
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">
                      ${internship.stipend}/month
                    </span>
                  )}
                </div>

                {internship.matchingSkills?.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {internship.matchingSkills.map((skill, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {internship.recommendationReason && (
                  <p className="mt-2 text-sm text-gray-600">{internship.recommendationReason}</p>
                )}
              </div>
              
              <button
                onClick={() => handleApplyClick(internship)}
                className="px-4 py-2 bg-[#4A72FF] text-white rounded-lg text-sm hover:bg-[#3A5FE6]"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
        {/* Upcoming Interviews */}
        <div>
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold text-[#1E1E1E] mb-6">
              Upcoming Interviews
            </h2>
            {scheduledInterviews.length > 0 ? (
              <div className="space-y-4">
                {scheduledInterviews.map((interview, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedInterview(interview)}
                  >
                    <div className="flex gap-4">
                      <div className="p-2 bg-gray-50 rounded">
                        <Calendar className="h-6 w-6 text-[#666]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1E1E1E]">
                        {interview.internship?.title || 'N/A'}
                        </h3>
                        
                        <p className="text-sm text-[#4A72FF] mt-1">
                        {new Date(interview.dateTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No upcoming interviews scheduled.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* Active Internships Modal */}
      {showActiveInternshipsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg">
            <h2 className="text-xl font-semibold text-[#1E1E1E] mb-4">Your Active Internships</h2>
            <div className="space-y-4">
              {activeInternships.map((internship, index) => (
                <div key={index} className="p-4 border border-[#E5E7EB] rounded-lg">
                  <h3 className="font-medium text-[#1E1E1E]">{internship.title}</h3>
                  <p className="text-sm text-[#666]">Stipend: ${internship.stipend}</p>
                  <p className="text-sm text-[#666]">Duration: {internship.duration} months</p>
                  <p className="text-sm text-[#666]">Location: {internship.location}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowActiveInternshipsModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 text-[#666] rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Apply Modal */}
{showApplyModal && selectedInternship && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
      <h2 className="text-xl font-semibold text-[#1E1E1E] mb-4">Confirm Application</h2>
      <div className="mb-6">
        <p className="text-sm text-[#666] mb-2">
          Are you sure you want to apply to the <strong>{selectedInternship.title}</strong> position?
        </p>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Your profile has a {Math.round(selectedInternship.matchScore)}% match with this role
          </p>
          {selectedInternship.matchingSkills?.length > 0 && (
            <p className="text-sm text-blue-600 mt-2">
              Matching skills: {selectedInternship.matchingSkills.join(', ')}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleConfirmApply}
          className="px-4 py-2 bg-[#4A72FF] text-white rounded-lg hover:bg-[#3A5FE6]"
        >
          Yes, Apply
        </button>
        <button
          onClick={() => setShowApplyModal(false)}
          className="px-4 py-2 bg-gray-300 text-[#666] rounded-lg hover:bg-gray-400"
        >
          No, Cancel
        </button>
      </div>
    </div>
  </div>
)}

      {/* Interview Management Modal */}
      {selectedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold text-[#1E1E1E] mb-4">Manage Interview</h2>
            <p className="text-sm text-[#666] mb-4">
              {`Role: ${selectedInterview.role}`} <br />
              {`Company: ${selectedInterview.company}`}
            </p>
            <div className="mb-4">
              <label className="block text-sm text-[#1E1E1E] mb-2">Reschedule Date</label>
              <DatePicker
                selected={rescheduleDate}
                onChange={(date) => setRescheduleDate(date)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-white text-gray-800"
              />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleReschedule}
                className="px-4 py-2 bg-[#4A72FF] text-white rounded-lg"
              >
                Reschedule
              </button>
              <button 
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Cancel Interview
              </button>
              <button 
                onClick={() => setSelectedInterview(null)}
                className="px-4 py-2 bg-gray-300 text-[#666] rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replace the existing CVBuilder component with: */}
<CVBuilder 
  isOpen={showCVBuilder} 
  onClose={handleCVBuilderClose}  // Changed from setShowCVBuilder(false)
/>
      <MessagingSystem 
        isOpen={showMessaging} 
        onClose={() => setShowMessaging(false)} 
      />
    </div>
  );
};

export default StudentDashboard;

