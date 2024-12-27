import React from 'react';
import { Briefcase, Calendar, MessageSquare, Bell } from 'lucide-react';

const StudentDashboard = () => {
  const stats = [
    { icon: Briefcase, label: 'Active Applications', value: 2 },
    { icon: Calendar, label: 'Upcoming Interviews', value: 2 },
    { icon: MessageSquare, label: 'New Messages', value: 3 },
  ];

  const internships = [
    {
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco',
    },
    {
      title: 'Backend Developer',
      company: 'WebSolutions',
      location: 'New York',
    },
  ];

  const interviews = [
    {
      role: 'Frontend Developer',
      company: 'WebSolutions Ltd',
      time: 'Tomorrow at 10:00 AM',
    },
    {
      role: 'Frontend Developer',
      company: 'WebSolutions Ltd',
      time: 'Tomorrow at 10:00 AM',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-[#1E1E1E]">Welcome, John!</h1>
          <p className="text-[#666]">Computer Science Student</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-6 w-6 text-[#666]" />
          </button>
          <div className="h-10 w-10 rounded-full bg-[#4A72FF] text-white flex items-center justify-center font-medium">
            JD
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 flex items-center">
              <div
                className={`p-2 rounded-lg ${
                  index === 0 ? 'bg-blue-50' : index === 1 ? 'bg-green-50' : 'bg-purple-50'
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Internship Matches */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold text-[#1E1E1E] mb-1">Recent Internship Matches</h2>
            <p className="text-[#666] text-sm mb-6">Based on your profile and preferences</p>

            <div className="space-y-4">
              {internships.map((internship, index) => (
                <div
                  key={index}
                  className="p-4 border border-[#E5E7EB] rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#1E1E1E]">{internship.title}</h3>
                      <p className="text-sm text-[#666]">{internship.company}</p>
                      <div className="mt-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                          {internship.location}
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#4A72FF] text-white rounded-lg text-sm hover:bg-[#3A5FE6]">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div>
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold text-[#1E1E1E] mb-6">Upcoming Interviews</h2>

            <div className="space-y-4">
              {interviews.map((interview, index) => (
                <div key={index} className="p-4 border border-[#E5E7EB] rounded-lg">
                  <div className="flex gap-4">
                    <div className="p-2 bg-gray-50 rounded">
                      <Calendar className="h-6 w-6 text-[#666]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1E1E1E]">{interview.role}</h3>
                      <p className="text-sm text-[#666]">{interview.company}</p>
                      <p className="text-sm text-[#4A72FF] mt-1">{interview.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
