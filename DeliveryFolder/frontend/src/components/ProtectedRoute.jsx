import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const roleBasedRoutes = {
  student: ["/student", "/profile", "/internship"],
  company: ["/company"],
  admin: ["/admin"],
};

const ProtectedRoute = ({ component: Component }) => {
  const { user } = React.useContext(UserContext);
  const location = useLocation();

  if (!user) {
    // Not logged in, redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has permission to access this route
  const currentPath = location.pathname;
  const allowedRoutes = roleBasedRoutes[user.type] || [];
  const hasAccess = allowedRoutes.some((route) =>
    currentPath.startsWith(route),
  );

  if (!hasAccess) {
    // Redirect to appropriate dashboard based on user type
    const defaultRoute = `/${user.type}`;
    return <Navigate to={defaultRoute} replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
