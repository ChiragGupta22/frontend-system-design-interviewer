import React, { useContext } from "react";
import { AuthContext } from "../context/MyContext";
import { Navigate, Outlet } from "react-router";

const AdminProtectedRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/" replace />;

  if (user.role !== "admin") {
    return <Navigate to="/ques" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoutes;