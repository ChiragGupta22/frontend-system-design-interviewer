import { Route, Routes } from "react-router";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Ques from "../pages/Ques";
import Interview from "../pages/Interview";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFound from "../pages/NotFound";
import Result from "../pages/Result";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/ques" element={<Ques />} />
        <Route path="/interview/:interviewId" element={<Interview />} />
        <Route path="/result" element={<Result />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;