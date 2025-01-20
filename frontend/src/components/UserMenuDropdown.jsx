import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, Settings, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserMenuDropdown = ({ role = 'student', initials = 'JD' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear all auth-related items from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    
    // Navigate to login page
    navigate('/login');
  };

  // Get background color based on role
  const getBgColor = () => {
    switch (role) {
      case 'admin':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'company':
        return 'bg-indigo-500 hover:bg-indigo-600';
      default:
        return 'bg-[#4A72FF] hover:bg-[#3A5FE6]';
    }
  };

  const getProfilePath = () => {
    switch (role) {
      case 'admin':
        return '/admin/profile';
      case 'company':
        return '/company/profile';
      default:
        return '/student/profile';
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
          {/* <button
            onClick={() => navigate(getProfilePath())}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User className="h-4 w-4 mr-2" />
            My Profile
          </button>
           */}
          {/* {role === 'admin' && (
            <button
              onClick={() => navigate('/admin/settings')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="h-4 w-4 mr-2" />
              Admin Settings
            </button>
          )}
          
          {role === 'company' && (
            <button
              onClick={() => navigate('/company/settings')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Company Settings
            </button>
          )} */}
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenuDropdown;