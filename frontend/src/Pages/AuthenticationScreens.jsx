import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Building2, GraduationCap, Lock, Mail } from 'lucide-react';

const AuthenticationApp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('student');

  const LoginForm = () => (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
      <p className="text-gray-600 text-center mb-6">Sign in to your S&C account</p>

      {/* User Type Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setUserType('student')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 
            ${userType === 'student' ? 'bg-blue-500 text-white' : 'text-white border border-gray-300'}`}
        >
          <GraduationCap className="h-5 w-5" />
          Student
        </button>
        <button
          onClick={() => setUserType('company')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2
            ${userType === 'company' ? 'bg-blue-500 text-white' : 'text-white border border-gray-300'}`}
        >
          <Building2 className="h-5 w-5" />
          Company
        </button>
      </div>

      {/* Login Form */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-500 focus:ring-2" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-500 hover:text-blue-600">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign In
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          onClick={() => setIsLogin(false)}
          className="text-blue-500 hover:text-blue-600"
        >
          Sign up
        </button>
      </p>
    </div>
  );

  const RegisterForm = () => (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
      <p className="text-gray-600 text-center mb-6">Join S&C to start your journey</p>

      {/* User Type Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setUserType('student')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 
            ${userType === 'student' ? 'bg-blue-500 text-white' : 'text-white border border-gray-300'}`}
        >
          <GraduationCap className="h-5 w-5" />
          Student
        </button>
        <button
          onClick={() => setUserType('company')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2
            ${userType === 'company' ? 'bg-blue-500 text-white' : 'text-white border border-gray-300'}`}
        >
          <Building2 className="h-5 w-5" />
          Company
        </button>
      </div>

      {/* Register Form */}
      <form className="space-y-4">
        {userType === 'student' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your university"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select industry</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Account
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          onClick={() => setIsLogin(true)}
          className="text-blue-500 hover:text-blue-600"
        >
          Sign in
        </button>
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthenticationApp;