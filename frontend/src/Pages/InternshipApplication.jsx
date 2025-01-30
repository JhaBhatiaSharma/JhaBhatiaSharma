//frontend/src/Pages/InternshipApplication.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Clock, Calendar, Users, ChevronLeft, Share2 } from 'lucide-react';

const InternshipDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Navigation */}
      <button className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-800">
        <ChevronLeft className="h-5 w-5" />
        Back to Search
      </button>

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Software Developer Intern</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Building2 className="h-4 w-4" />
                    TechCorp Inc.
                  </CardDescription>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <MapPin className="h-4 w-4" />
                    Location
                  </div>
                  <div className="font-medium">San Francisco, CA</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Clock className="h-4 w-4" />
                    Duration
                  </div>
                  <div className="font-medium">6 months</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </div>
                  <div className="font-medium">June 2024</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Users className="h-4 w-4" />
                    Positions
                  </div>
                  <div className="font-medium">5 openings</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">About the Role</h3>
                  <p className="text-gray-600">
                    We are seeking a passionate Software Developer Intern to join our innovative team. 
                    You will work on real-world projects, collaborate with experienced developers, and 
                    gain hands-on experience with modern technologies.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Currently pursuing a degree in Computer Science or related field</li>
                    <li>Strong understanding of web technologies and programming concepts</li>
                    <li>Experience with React, Node.js, and modern JavaScript</li>
                    <li>Excellent problem-solving and analytical skills</li>
                    <li>Strong communication and teamwork abilities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Competitive stipend</li>
                    <li>Flexible work hours</li>
                    <li>Mentorship from senior developers</li>
                    <li>Opportunity for full-time conversion</li>
                    <li>Learning and development resources</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Sidebar */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Apply Now</CardTitle>
              <CardDescription>
                Complete your application for Software Developer Intern position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Skills Match */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-800">Skills Match</span>
                    <span className="text-lg font-bold text-green-800">85%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 rounded-full h-2" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Quick Apply */}
                <button className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
                  Quick Apply with Profile
                </button>

                {/* Custom Application */}
                <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                  Custom Application
                </button>

                {/* Company Info */}
                <div className="pt-6 border-t">
                  <h4 className="font-semibold mb-3">About TechCorp Inc.</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Leading technology company specializing in innovative software solutions.
                    Over 1000+ employees globally with a strong focus on developer growth.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Building2 className="h-4 w-4" />
                    <a href="#" className="text-sm font-medium">View Company Profile</a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
