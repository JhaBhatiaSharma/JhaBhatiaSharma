import { useState, useRef, useEffect } from "react";
import { LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api";
// eslint-disable-next-line react/prop-types
const UserMenuDropdown = ({ role = "student", initials = "JD" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear all auth-related items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");

    // Navigate to login page
    navigate("/login");
  };

  const handlePasswordChange = async () => {
    try {
      const response = await API.post("/users/reset-password", {
        email,
        newPassword,
      });
      setMessage(response.data.message);
      setTimeout(() => {
        setIsModalOpen(false);
        setMessage("");
        setEmail("");
        setNewPassword("");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error changing password");
    }
  };

  // Get background color based on role
  const getBgColor = () => {
    switch (role) {
      case "admin":
        return "bg-blue-500 hover:bg-blue-600";
      case "company":
        return "bg-indigo-500 hover:bg-indigo-600";
      default:
        return "bg-[#4A72FF] hover:bg-[#3A5FE6]";
    }
  };
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const getProfilePath = () => {
    switch (role) {
      case "admin":
        return "/admin/profile";
      case "company":
        return "/company/profile";
      default:
        return "/student/profile";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-10 w-10 rounded-full text-white flex items-center justify-center font-semibold transition-colors ${getBgColor()}`}
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-500"
          >
            <Settings className="h-4 w-4 mr-2" />
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 text-white rounded-xl px-3 py-2"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 text-white rounded-xl px-3 py-2"
                placeholder="Enter new password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handlePasswordChange}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Change Password
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-700 hover:underline"
              >
                Cancel
              </button>
            </div>
            {message && (
              <p className="mt-4 text-sm text-green-600">{message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenuDropdown;
