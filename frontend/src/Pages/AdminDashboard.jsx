//frontend/src/Pages/AdminDashboard.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  AlertCircle, 
  BarChart2, 
  Settings, 
  Search, 
  Bell,
  FileText,
  UserCog,
  Filter,
  Download
} from 'lucide-react';
import UserMenuDropdown from '../components/UserMenuDropdown';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow">
        <div className="flex justify-between items-center px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">University Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>
            <UserMenuDropdown role="admin" initials="AD" />
          </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Users</p>
                  <h3 className="text-2xl font-bold">1,234</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Active Complaints</p>
                  <h3 className="text-2xl font-bold">23</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart2 className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Active Internships</p>
                  <h3 className="text-2xl font-bold">456</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Reports Generated</p>
                  <h3 className="text-2xl font-bold">89</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Management */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage system users and their permissions</CardDescription>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600">
                    <UserCog className="h-4 w-4" />
                    Add User
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                  <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    Filter
                  </button>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((item) => (
                        <tr key={item} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">John Doe</td>
                          <td className="py-3 px-4">Student</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                              Active
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="text-blue-500 hover:text-blue-700">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Complaint Handling */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Complaints</CardTitle>
                <CardDescription>Handle and monitor user complaints</CardDescription>
              </CardHeader>
              <CardContent>
                {[1, 2].map((item) => (
                  <div key={item} className="mb-4 p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-semibold">Internship Issue Report</h4>
                        <p className="text-sm text-gray-600">Filed by: Sarah Parker</p>
                        <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm h-fit">
                        Pending
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">Supervisor not providing adequate guidance...</p>
                    <div className="flex gap-2 mt-4">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Review
                      </button>
                      <button className="px-3 py-1 border rounded hover:bg-gray-50">
                        Assign
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            {/* Report Generation */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Create custom system reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BarChart2 className="h-5 w-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium">Usage Statistics</h4>
                          <p className="text-sm text-gray-500">System activity report</p>
                        </div>
                      </div>
                      <Download className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-green-500" />
                        <div>
                          <h4 className="font-medium">User Analytics</h4>
                          <p className="text-sm text-gray-500">User behavior report</p>
                        </div>
                      </div>
                      <Download className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 border rounded-lg text-blue-500 hover:bg-blue-50">
                    Custom Report
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>System settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-gray-400" />
                      <span>Notification Settings</span>
                    </div>
                    <button className="text-blue-500">Edit</button>
                  </div>

                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <UserCog className="h-5 w-5 text-gray-400" />
                      <span>User Permissions</span>
                    </div>
                    <button className="text-blue-500">Edit</button>
                  </div>

                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-gray-400" />
                      <span>System Alerts</span>
                    </div>
                    <button className="text-blue-500">Edit</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;