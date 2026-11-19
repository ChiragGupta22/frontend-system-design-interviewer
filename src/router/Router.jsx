
import { Route, Routes } from "react-router";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Ques from "../pages/Ques";
import Interview from "../pages/Interview";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFound from "../pages/NotFound";
import Result from "../pages/Result";

import AdminProtectedRoutes from "./AdminProtectedRoutes";
import AdminDashboard from "../pages/AdminDashboard";
import AdminUsers from "../pages/AdminUsers";
import AdminAnswers from "../pages/AdminAnswers";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* User Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/ques" element={<Ques />} />
        <Route path="/interview/:interviewId" element={<Interview />} />
        <Route path="/result/:interviewId" element={<Result />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminProtectedRoutes />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/answers" element={<AdminAnswers />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
