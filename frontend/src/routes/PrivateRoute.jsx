import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Mock authentication function (Replace with actual authentication logic)
const getUserRole = () => {
  return localStorage.getItem("userRole"); // Example: "admin" or "user"
};

function PrivateRoute({ allowedRoles }) {
  const userRole = getUserRole();

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;