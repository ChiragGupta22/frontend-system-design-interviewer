
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  BrainCircuit,
  LayoutDashboard,
  Users,
  MessageSquare,
  LogOut,
  UserRound,
  FileText,
} from "lucide-react";

import { getAllUsers, getAllUsersMarks } from "../services/authservices";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [usersRes, answersRes] = await Promise.all([
          getAllUsers(token),
          getAllUsersMarks(token),
        ]);

        const users = Array.isArray(usersRes.data)
          ? usersRes.data
          : usersRes.data?.users || [];

        const answers = Array.isArray(answersRes.data)
          ? answersRes.data
          : answersRes.data?.marks || [];

        setTotalUsers(users.length);
        setTotalAnswers(answers.length);

      } catch (error) {
        console.log("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#080817] text-white flex">

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#111124] p-6">

        <div className="flex items-center gap-3 mb-12">
          <BrainCircuit className="text-violet-400" size={30} />
          <h1 className="text-xl font-bold">
            AI <span className="text-violet-400">Interviewer</span>
          </h1>
        </div>

        <nav className="space-y-3">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-3 w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium"
          >
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <Users size={19} />
            Users
          </button>

          <button
            onClick={() => navigate("/admin/answers")}
            className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <MessageSquare size={19} />
            Answers
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-8 flex items-center gap-3 text-sm text-red-400 hover:text-red-300"
        >
          <LogOut size={19} />
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">

          <div>
            <h2 className="text-3xl font-bold">
              Admin Dashboard
            </h2>
            <p className="text-slate-400 mt-2">
              Welcome back, Admin!
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111124] px-4 py-3">
            <UserRound className="text-violet-400" />
            <span className="text-sm">Administrator</span>
          </div>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Total Users */}
          <div className="rounded-2xl border border-white/10 bg-[#111124] p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Users</p>
                <h3 className="text-4xl font-bold mt-3">
                  {loading ? "..." : totalUsers}
                </h3>
              </div>

              <div className="rounded-xl bg-violet-500/10 p-4">
                <Users className="text-violet-400" size={28} />
              </div>
            </div>
          </div>

          {/* Total Answers */}
          <div className="rounded-2xl border border-white/10 bg-[#111124] p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Answers</p>
                <h3 className="text-4xl font-bold mt-3">
                  {loading ? "..." : totalAnswers}
                </h3>
              </div>

              <div className="rounded-xl bg-indigo-500/10 p-4">
                <FileText className="text-indigo-400" size={28} />
              </div>
            </div>
          </div>

        </div>

        {/* Welcome Section */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#111124] p-8">

          <h3 className="text-xl font-bold">
            Manage Your Platform
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Manage registered users and view all submitted
            interview answers from one place.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/admin/users")}
              className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-700"
            >
              View Users
            </button>

            <button
              onClick={() => navigate("/admin/answers")}
              className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold hover:bg-white/5"
            >
              View Answers
            </button>

          </div>

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
