import React, { useContext } from "react";
import { AuthContext } from "../context/MyContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;