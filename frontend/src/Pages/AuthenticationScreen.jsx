import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { GraduationCap, Building2, Mail, Lock } from 'lucide-react';
import API from '../api';

const AuthenticationScreen = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to backend login endpoint
      const response = await API.post(`/auth/${userType}/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      // Decode token (if needed) or use response data to get user type and other info
      const user = {
        email: formData.email,
        type: userType,
        name: response.data.name || 'User', // Replace with actual name if returned from API
      };

      // Save token and user info using context
      await login(user, token);

      // Navigate to user-specific dashboard
      navigate(`/${userType}`);
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      alert(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleDemoAccount = (type) => {
    const demoAccounts = {
      student: {
        email: 'student@example.com',
        password: 'password123',
        type: 'student',
      },
      company: {
        email: 'company@example.com',
        password: 'password123',
        type: 'company',
      },
    };

    setUserType(type);
    setFormData({
      email: demoAccounts[type].email,
      password: demoAccounts[type].password,
    });
  };

  return (
    <div className="min-h-screen w-screen bg-[#F8F9FA] flex items-center justify-center">
      <div className=" bg-white rounded-lg shadow-2xl">
        <div className="px-8 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-[#1E1E1E]">Welcome Back</h1>
            <p className="text-sm text-[#666666] mt-1">Sign in to your account</p>
          </div>

          {/* User Type Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-lg text-sm transition-colors
                ${userType === 'student' 
                  ? 'bg-[#4F46E5] text-white' 
                  : 'bg-[#1E1E1E] text-white'}`}
            >
              <GraduationCap className="w-4 h-4" />
              Student
            </button>
            <button
              type="button"
              onClick={() => setUserType('company')}
              className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-lg text-sm transition-colors
                ${userType === 'company' 
                  ? 'bg-[#4F46E5] text-white' 
                  : 'bg-[#1E1E1E] text-white'}`}
            >
              <Building2 className="w-4 h-4" />
              Company
            </button>
            <button
              type="button"
              onClick={() => setUserType('admin')}
              className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-lg text-sm transition-colors
                ${userType === 'admin' 
                  ? 'bg-[#4F46E5] text-white' 
                  : 'bg-[#1E1E1E] text-white'}`}
            >
              <Building2 className="w-4 h-4" />
              Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#F3F4F6] pl-10 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#F3F4F6] pl-10 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4F46E5] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#4338CA] transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500 mb-4">Try demo accounts:</p>
            <div className="space-y-2">
              <button
                onClick={() => handleDemoAccount('student')}
                className="w-full flex items-center justify-center gap-2 p-2 bg-[#F3F4F6] rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                Demo Student Account
              </button>
              <button
                onClick={() => handleDemoAccount('company')}
                className="w-full flex items-center justify-center gap-2 p-2 bg-[#F3F4F6] rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                <Building2 className="w-4 h-4" />
                Demo Company Account
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Don&apos;t have an account?</p>
            <button
              onClick={() => navigate('/register')}
              className="mt-2 bg-[#4F46E5] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#4338CA] transition-colors"
            >
              Sign Up Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationScreen;
