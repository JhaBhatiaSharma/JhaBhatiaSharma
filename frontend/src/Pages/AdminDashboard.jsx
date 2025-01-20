import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  AlertCircle,
  BarChart2,
  Settings,
  Search,
  Bell,
  UserCog,
  Filter,
} from 'lucide-react';
import UserMenuDropdown from '../components/UserMenuDropdown';
import MessagingSystem from './MessagingSystem';
import API from '../api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // Store fetched user data
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for API calls
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isInternshipModalOpen, setInternshipModalOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [isComplaintModalOpen, setComplaintModalOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [isStudentModalOpen,setStudentModalOpen]=useState(false)
  const [isRecruiterModalOpen,setRecruiterModalOpen]=useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    type: 'student', // Default type
    firstName: '',
    lastName: '',
    university: '',
  }); // Form data for new user
  const [configurations, setConfigurations] = useState({
    notificationSettings: "",
    userPermissions: "",
    systemAlerts: "",
  });
  const [selectedConfig, setSelectedConfig] = useState(null); // Tracks which config is being edited
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [editData, setEditData] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await API.get('/admin/users', {
        params: { search: searchQuery, role: filterRole },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await API.get("/internships/allinternships");
        setInternships(response.data);
      } catch (error) {
        console.error("Failed to fetch internships:", error.message);
      }
    };

    fetchInternships();
  }, []);

  const handleSearch = async () => {
    await fetchUsers();
  };

  const openInternshipModal = () => {
    setInternshipModalOpen(true);
  };
  const closeInternshipModal = () => setInternshipModalOpen(false);

  const openAddUserModal = () => {
    setEditingUser(null); // Reset editing state
    setFormData({
      email: '',
      password: '',
      type: 'student',
      firstName: '',
      lastName: '',
      university: '',
    });
    setModalOpen(true);
  };
  const openEditUserModal = (user) => {
    setEditingUser(user); // Set the user to be edited
    setFormData({
      email: user.email,
      password: '', // Keep this blank for security reasons
      type: user.type,
      firstName: user.firstName,
      lastName: user.lastName,
      university: user.profile?.university || '', // Handle student-specific fields
    });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update user logic
        const updates = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          type: formData.type,
          profile: formData.type === 'student' ? { university: formData.university } : {},
        };
  
        await API.put(`/admin/users/${editingUser._id}`, updates, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert('User updated successfully!');
      } else {
        // Add new user logic
        const payload = {
          email: formData.email,
          password: formData.password,
          type: formData.type,
          firstName: formData.firstName,
          lastName: formData.lastName,
          profile: formData.type === 'student' ? { university: formData.university } : {},
        };
  
        await API.post(`/auth/${formData.type}/register`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert('User added successfully!');
      }
      closeModal();
      fetchUsers(); // Refresh the user list
    } catch (err) {
      console.error('Failed to submit user:', err.response?.data?.message || err.message);
      alert(err.response?.data?.message || 'Failed to submit user. Please try again.');
    }
  };

  const handleDeleteUser = async () => {
    if (!editingUser) return;

    try {
      await API.delete(`/admin/users/${editingUser._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('User deleted successfully!');
      setConfirmDeleteOpen(false);
      setModalOpen(false);
      fetchUsers(); // Refresh the user list
    } catch (err) {
      console.error('Failed to delete user:', err.response?.data?.message || err.message);
      alert('Failed to delete user. Please try again.');
    }
  };

  // complaint stuff
  const fetchComplaints = async () => {
    try {
      const response = await API.get('/complaints/get-complaints', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setComplaints(response.data.data);
      console.log("complaints are:", response.data.data)
    } catch (error) {
      console.error('Failed to fetch complaints:', error.message);
    }
  };

  useEffect(() => {
    fetchComplaints()
  },[])

  const handleMarkResolved = async (complaintId) => {
    try {
      await API.patch(`/complaints/${complaintId}/resolve`, {}, {
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Complaint marked as resolved!');
      fetchComplaints(); // Refresh complaints after marking as resolved
    } catch (error) {
      console.error('Failed to resolve complaint:', error.message);
      alert('Failed to mark complaint as resolved. Please try again.');
    }
  };
  const openStudentModal = () => {
    setStudentModalOpen(true)
  };
  
  const openRecruiterModal = () => {
   setRecruiterModalOpen(true)
  };
  
  const closeStudentModal = () => {
    setStudentModalOpen(false)
  };
  
  const closeRecruiterModal = () => {
    setRecruiterModalOpen(false)
  };



  const downloadReport = async (reportType) => {
    try {
      const response = await API.get(`/reports/download?type=${reportType}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        responseType: 'blob', // Ensures the response is treated as a file
      });
  
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `${reportType}-report-${new Date().toISOString()}.pdf`
        ); // Name of the downloaded file
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error('Failed to download report:', response.data.message);
        alert('Failed to download the report. Please try again.');
      }
    } catch (error) {
      console.error('Error during report download:', error.message);
      alert('Error downloading the report. Please try again.');
    }
  };
  
  
  // Configuration Setting
  const fetchConfigurations = async () => {
    try {
      const response = await API.get("/configurations");
      setConfigurations(response.data);
    } catch (error) {
      console.error("Failed to fetch configurations:", error.message);
    }
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);

  const handleEdit = (type) => {
    setSelectedConfig(type);
    setEditData(configurations[type]);
    setIsConfigModalOpen(true);
  };

  const handleSave = async () => {
    try {
      await API.put(`/configurations/${selectedConfig}`, { value: editData });
      setConfigurations((prev) => ({
        ...prev,
        [selectedConfig]: editData,
      }));
      setIsConfigModalOpen(false);
      alert("Configuration updated successfully!");
    } catch (error) {
      console.error("Failed to save configuration:", error.message);
      alert("Failed to update configuration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      {/* Top Navigation */}
      <div className="bg-white shadow">
        <div className="flex justify-between items-center px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">University Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin</p>
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
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>
            <UserMenuDropdown role="admin" initials="AD" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Users</p>
                  <h3 className="text-2xl font-bold">{users.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4" onClick={openInternshipModal}>
                  <p className="text-sm text-gray-600">Posted Internships</p>
                  <h3 className="text-2xl font-bold">{internships.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card onClick={openStudentModal}>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <h3 className="text-2xl font-bold">
                    {users.filter((user) => user.role === "student").length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card onClick={openRecruiterModal}>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Recruiters</p>
                  <h3 className="text-2xl font-bold">
                    {users.filter((user) => user.role === "recruiter").length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
      </div>
    {isInternshipModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-2xl p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">All Internships</h2>
            <div className="max-h-[400px] overflow-y-auto">
              <ul>
                {internships.map((internship) => (
                  <li key={internship._id} className="border-b py-2">
                    <p className="font-semibold">{internship.title}</p>
                    <p className="text-sm text-gray-600">{internship.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeInternshipModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isStudentModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-[90%] max-w-2xl p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Students</h2>
      <div className="max-h-[400px] overflow-y-auto">
        {users.filter((user) => user.role === "student").length > 0 ? (
          <ul>
            {users
              .filter((user) => user.role === "student")
              .map((student) => (
                <li key={student._id} className="border-b py-4">
                  <p className="font-semibold">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    University: {student.profile?.university || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">Email: {student.email}</p>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-600">No students found.</p>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={closeStudentModal}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

{isRecruiterModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-[90%] max-w-2xl p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Recruiters</h2>
      <div className="max-h-[400px] overflow-y-auto">
        {users.filter((user) => user.role === "recruiter").length > 0 ? (
          <ul>
            {users
              .filter((user) => user.role === "recruiter")
              .map((recruiter) => (
                <li key={recruiter._id} className="border-b py-4">
                  <p className="font-semibold">
                    {recruiter.firstName} {recruiter.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Company: {recruiter.profile?.companyName || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">Email: {recruiter.email}</p>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recruiters found.</p>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={closeRecruiterModal}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



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
                  <button
                    onClick={openAddUserModal}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600"
                  >
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-4 text-white py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-500"
                  >
                    <Filter className="h-4 w-4 text-white" />
                    Search
                  </button>
                </div>

                {/* Users Table */}
                {loading ? (
                  <p className="text-gray-600">Loading users...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <div className="max-h-[200px] overflow-y-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Role</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user._id} className="border-b">
                              <td className="py-3 px-4">{`${user.firstName} ${user.lastName}`}</td>
                              <td className="py-3 px-4">{user.type}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-1 ${
                                    user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                  } rounded-full text-sm`}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <button
                                  onClick={() => openEditUserModal(user)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Create custom system reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Usage Statistics */}
                <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg">
                  <div>
                    <h4 className="text-lg font-semibold p-1">Usage Statistics</h4>
                    <p className="text-sm text-gray-500 p-1">System activity report</p>
                  </div>
                  <button
                    onClick={() => downloadReport('usage-statistics')}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2 m-1"
                  >
                    <span>Download</span>
                  </button>
                </div>

                {/* User Analytics */}
                <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg">
                  <div>
                    <h4 className="text-lg font-semibold">User Analytics</h4>
                    <p className="text-sm text-gray-500">User behavior report</p>
                  </div>
                  <button
                    onClick={() => downloadReport('user-analytics')}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          



          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Complaints Management</CardTitle>
                    <CardDescription>Review and resolve user complaints</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Complaints Table */}
                {complaints.length === 0 ? (
                  <p className="text-gray-600">No complaints found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <div className="max-h-[200px] overflow-y-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Complaint</th>
                            <th className="text-left py-3 px-4">User</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {complaints.map((complaint) => (
                            <tr key={complaint._id} className="border-b">
                              <td className="py-3 px-4">{complaint.title}</td>
                              <td className="py-3 px-4">
                                {complaint.userId?.firstName} {complaint.userId?.lastName}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-1 ${
                                    complaint.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-green-100 text-green-700'
                                  } rounded-full text-sm`}
                                >
                                  {complaint.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <button
                                  className={`text-blue-500 hover:text-blue-700 ${
                                    complaint.status === 'resolved'
                                      ? 'cursor-not-allowed text-gray-400'
                                      : ''
                                  }`}
                                  onClick={() => handleMarkResolved(complaint._id)}
                                  disabled={complaint.status === 'resolved'}
                                >
                                  {complaint.status === 'pending' ? 'Resolve' : 'Resolved'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
        <CardDescription>System settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Notification Settings */}
          <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg">
            <div>
              <h4 className="text-lg font-semibold">Notification Settings</h4>
            </div>
            <button
              onClick={() => handleEdit("notificationSettings")}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Edit
            </button>
          </div>

          {/* User Permissions */}
          <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg">
            <div>
              <h4 className="text-lg font-semibold">User Permissions</h4>
            </div>
            <button
              onClick={() => handleEdit("userPermissions")}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Edit
            </button>
          </div>

          {/* System Alerts */}
          <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg">
            <div>
              <h4 className="text-lg font-semibold">System Alerts</h4>
            </div>
            <button
              onClick={() => handleEdit("systemAlerts")}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Edit
            </button>
          </div>
        </div>
      </CardContent>

      {/* Modal for Editing Configuration */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 bg-black text-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit {selectedConfig}</h2>
            <textarea
              value={editData}
              onChange={(e) => setEditData(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none"
            />
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsConfigModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
        </div>
      </div>

      

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-white"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-white"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-white"
                  required
                  disabled={!!editingUser} // Disable email input when editing
                />
                {!editingUser && (
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-white"
                    required
                  />
                )}
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-white"
                  required
                >
                  <option value="student">Student</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="admin">Admin</option>
                </select>
                {formData.type === 'student' && (
                  <input
                    type="text"
                    name="university"
                    placeholder="University"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-white"
                  />
                )}
              </div>
              <div className="flex justify-end mt-6 gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-lg  hover:bg-gray-100 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
                {editingUser && ( // Show the Delete button only if editingUser is set
                  <button 
                    onClick={() => setConfirmDeleteOpen(true)} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setConfirmDeleteOpen(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="text-red-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
