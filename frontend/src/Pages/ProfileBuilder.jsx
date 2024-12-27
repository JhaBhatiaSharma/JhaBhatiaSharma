import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Book, Code, Building2, GraduationCap, Plus } from 'lucide-react';

const ProfileBuilder = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Build Your Profile</h1>
        <p className="text-gray-600">Make your profile stand out to potential employers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" className="w-full p-2 border rounded-lg" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" className="w-full p-2 border rounded-lg" placeholder="Doe" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium text-gray-700">Professional Summary</label>
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    rows="4"
                    placeholder="Write a brief professional summary..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Bachelor of Computer Science</h4>
                      <p className="text-gray-600">University of Technology</p>
                      <p className="text-sm text-gray-500">2020 - 2024</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Edit</button>
                  </div>
                </div>

                <button className="w-full p-4 border border-dashed rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Education
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['React', 'JavaScript', 'Node.js', 'Python', 'Git'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button className="hover:text-blue-800">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="Add a skill..."
                  />
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Add
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Software Developer Intern</h4>
                      <p className="text-gray-600">Tech Solutions Inc.</p>
                      <p className="text-sm text-gray-500">June 2023 - August 2023</p>
                      <ul className="list-disc list-inside text-gray-600 mt-2 text-sm">
                        <li>Developed and maintained web applications</li>
                        <li>Collaborated with senior developers on key projects</li>
                      </ul>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Edit</button>
                  </div>
                </div>

                <button className="w-full p-4 border border-dashed rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Experience
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Sidebar */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>Track your profile strength</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Completion Progress */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Overall Completion</span>
                    <span className="text-sm font-medium text-blue-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Section Completion */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Basic Information</span>
                      <span className="text-sm text-green-600">Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div className="bg-green-500 rounded-full h-1 w-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Education</span>
                      <span className="text-sm text-green-600">Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div className="bg-green-500 rounded-full h-1 w-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Skills</span>
                      <span className="text-sm text-yellow-600">In Progress</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-yellow-500 rounded-full h-1"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Experience</span>
                      <span className="text-sm text-yellow-600">In Progress</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-yellow-500 rounded-full h-1"
                        style={{ width: '80%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Save Changes
                  </button>
                  <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Preview Profile
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileBuilder;
