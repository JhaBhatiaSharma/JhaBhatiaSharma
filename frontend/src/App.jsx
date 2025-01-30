//frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthenticationScreen from './pages/AuthenticationScreen'; 
import AdminDashboard from './Pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CompanyDashboard from './Pages/Company/CompanyDashboard';
import ProfileBuilder from './pages/ProfileBuilder';
import InternshipApplication from './pages/InternshipApplication';
import SignupScreen from './Pages/SignupScreen';
import AddInternship from './Pages/Company/AddInternship';
import InternshipDetails from './Pages/Company/InternshipDetails';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<AuthenticationScreen />} />  {/* Changed to AuthenticationScreen */}
          <Route path="/register" element={<SignupScreen />} />  
          <Route path="/company" element={<CompanyDashboard/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/add-internship" element={<AddInternship/>} />
          <Route path="/all-internships" element={<InternshipDetails/>} />
          {/* Protected Routes */}
          <Route
            path="/admin/*"
            element={<ProtectedRoute component={AdminDashboard} />}
          />
          <Route
            path="/student/*"
            element={<ProtectedRoute component={StudentDashboard} />}
          />
          <Route
            path="/company/*"
            element={<ProtectedRoute component={CompanyDashboard} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute component={ProfileBuilder} />}
          />
          <Route
            path="/internship"
            element={<ProtectedRoute component={InternshipApplication} />}
          />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Catch all route for 404s */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
