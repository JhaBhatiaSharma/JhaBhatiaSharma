// //frontend/src/Pages/SignupScreen.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { GraduationCap, Building2 } from 'lucide-react';

// const SignupScreen = () => {
//   const [userType, setUserType] = useState('student');
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     university: '',
//     email: '',
//     password: '',
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const headers = { usertype: userType };
//       const payload = userType === 'student'
//         ? {
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             university: formData.university,
//             email: formData.email,
//             password: formData.password, // Assuming password is required
//           }
//         : {
//             companyName: formData.firstName, // Assuming company name maps to firstName
//             email: formData.email,
//             password: formData.password, // Assuming password is required
//           };

//       const response = await axios.post('/register', payload, { headers });
//       console.log('Signup successful:', response.data);

//       alert('Signup successful! Please log in.');
//       navigate('/login');
//     } catch (err) {
//       console.error('Signup failed:', err.response?.data?.message || err.message);
//       alert(err.response?.data?.message || 'Signup failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
//       <div className="w-[360px] bg-white rounded-lg shadow-sm">
//         <div className="px-8 py-6">
//           {/* Header */}
//           <div className="mb-6 text-center">
//             <h1 className="text-xl font-semibold text-[#1E1E1E]">Create Account</h1>
//             <p className="text-sm text-[#666666] mt-1">Join S&C to start your journey</p>
//           </div>

//           {/* User Type Toggle */}
//           <div className="flex gap-2 mb-6">
//             <button
//               type="button"
//               onClick={() => setUserType('student')}
//               className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
//                 userType === 'student' ? 'bg-[#4F46E5] text-white' : 'bg-[#1E1E1E] text-white'
//               }`}
//             >
//               <GraduationCap className="w-4 h-4" />
//               Student
//             </button>
//             <button
//               type="button"
//               onClick={() => setUserType('recruiter')}
//               className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
//                 userType === 'recruiter' ? 'bg-[#4F46E5] text-white' : 'bg-[#1E1E1E] text-white'
//               }`}
//             >
//               <Building2 className="w-4 h-4" />
//               Company
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {userType === 'student' && (
//               <>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={formData.firstName}
//                     onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                     placeholder="Enter first name"
//                     className="w-1/2 bg-[#F3F4F6] px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
//                     required
//                   />
//                   <input
//                     type="text"
//                     value={formData.lastName}
//                     onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                     placeholder="Enter last name"
//                     className="w-1/2 bg-[#F3F4F6] px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
//                     required
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   value={formData.university}
//                   onChange={(e) => setFormData({ ...formData, university: e.target.value })}
//                   placeholder="Enter your university"
//                   className="w-full bg-[#F3F4F6] px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
//                 />
//               </>
//             )}
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               placeholder="Enter your email"
//               className="w-full bg-[#F3F4F6] px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
//               required
//             />
//             <input
//               type="password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               placeholder="Create password"
//               className="w-full bg-[#F3F4F6] px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-[#4F46E5] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#4338CA] transition-colors"
//             >
//               Create Account
//             </button>
//           </form>

//           {/* Redirect to Login */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-500">Already have an account?</p>
//             <button
//               onClick={() => navigate('/login')}
//               className="mt-2 text-sm text-[#4F46E5] hover:underline"
//             >
//               Sign in
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupScreen;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Building2 } from 'lucide-react';
import API from '../api';

const SignupScreen = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    university: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the payload for the POST request
      const payload = {
        email: formData.email,
        password: formData.password,
        role: userType, // "student" or "recruiter"
        firstName: formData.firstName,
        lastName: formData.lastName,
        profile: userType === 'student' ? { university: formData.university } : {}, // Add university for students
      };

      // Make POST request to /register endpoint
      const response = await API.post(`/auth/${userType}/register`, payload);

      console.log('Signup successful:', response.data);

      // Notify user and navigate to login page
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err.response?.data?.message || err.message);
      alert(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#F8F9FA] flex items-center justify-center">
      <div className="w-[450px] bg-white rounded-lg shadow-2xl">
        <div className="px-8 py-6">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold text-[#1E1E1E]">Create Account</h1>
            <p className="text-sm text-[#666666] mt-1">Join S&C to start your journey</p>
          </div>

          {/* User Type Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                userType === 'student' ? 'bg-[#4F46E5] text-white' : 'bg-[#1E1E1E] text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Student
            </button>
            <button
              type="button"
              onClick={() => setUserType('company')}
              className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                userType === 'recruiter' ? 'bg-[#4F46E5] text-white' : 'bg-[#1E1E1E] text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Company
            </button>
            <button
              type="button"
              onClick={() => setUserType('admin')}
              className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                userType === 'admin' ? 'bg-[#4F46E5] text-white' : 'bg-[#1E1E1E] text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student-Specific Fields */}
            {userType === 'student' && (
              <>
                <div className="flex gap-2">
                  
                </div>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  placeholder="Enter your university"
                  className="w-full bg-[#F3F4F6] px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </>
            )}
            {/* Common Fields */}
            <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Enter first name"
                    className="w-1/2 bg-[#F3F4F6] px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    required
                  />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Enter last name"
                    className="w-1/2 bg-[#F3F4F6] px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    required
                  />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full bg-[#F3F4F6] px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              required
            />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create password"
              className="w-full bg-[#F3F4F6] px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#4F46E5] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#4338CA] transition-colors"
            >
              Create Account
            </button>
          </form>

          {/* Redirect to Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Already have an account?</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-2 text-sm text-[#4F46E5] hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
