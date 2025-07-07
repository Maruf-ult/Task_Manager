import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UseContext";

function PrivateRoute({ allowedRoles }) {
  const { user, loading } = useContext(UserContext);

  console.log("PrivateRoute user:", user, "loading:", loading);

  if (loading) return null;

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
