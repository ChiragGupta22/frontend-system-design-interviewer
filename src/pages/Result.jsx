
import { useEffect, useState } from "react";

import {
  BrainCircuit,
  Trophy,
  Target,
  ChartNoAxesCombined,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Users,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

import { useNavigate, useParams } from "react-router";

import { useAuth } from "../context/MyContext";

import { getScores } from "../services/authservices";

const Result = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();

  const { token, user, loading: authLoading } = useAuth();

  const isAdmin = user?.role === "admin";

  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScores = async () => {
      if (authLoading) return;

      if (!token || !user) {
        setError("Authentication information is missing.");
        setLoading(false);
        return;
      }

      // Interview ID is required only for the normal user's result route.
      if (!isAdmin && !interviewId) {
        setError("Interview information is missing.");
        setLoading(false);
        return;
      }

      try {
        // Backend automatically checks the user's role.
        const res = await getScores(token);

        setScores(res.data);
      } catch (err) {
        console.error("Fetch scores error:", err);

        setError(
          err.response?.data?.detail ||
          "Failed to fetch interview results."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [token, user, interviewId, isAdmin, authLoading]);

  // Common calculations
  const totalMarks = scores.reduce(
    (total, item) => total + (Number(item.marks) || 0),
    0
  );

  const attemptedQuestions = scores.length;

  const maxMarks = attemptedQuestions * 10;

  const percentage = maxMarks
    ? ((totalMarks / maxMarks) * 100).toFixed(1)
    : 0;

  const averageMarks = attemptedQuestions
    ? (totalMarks / attemptedQuestions).toFixed(2)
    : 0;

  // Admin calculations
  const totalUsers = new Set(
    scores.map((item) => item.user_id)
  ).size;

  const adminAverage = attemptedQuestions
    ? (totalMarks / attemptedQuestions).toFixed(2)
    : 0;

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080817] text-violet-400">
        <Loader2 className="mr-3 animate-spin" />
        Loading results...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#080817] text-white">
        <p className="text-red-400">{error}</p>

        <button
          onClick={() => navigate("/ques")}
          className="rounded-xl bg-violet-600 px-5 py-3"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#080817] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-9 w-9 text-violet-400" />

            <h1 className="text-2xl font-bold">
              AI <span className="text-violet-400">Interviewer</span>
            </h1>
          </div>

          <button
            onClick={() => navigate("/ques")}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>
        </div>

        {/* ADMIN DASHBOARD */}

        {isAdmin ? (

          <>

            {/* Admin Heading */}

            <div className="mb-10">
              <div className="mb-3 flex items-center gap-3">
                <ShieldCheck className="h-9 w-9 text-violet-400" />

                <h2 className="text-3xl font-bold">
                  Admin Dashboard
                </h2>
              </div>

              <p className="text-slate-400">
                Monitor all users and their interview performance.
              </p>
            </div>

            {/* Admin Stats */}

            <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-violet-400/20 bg-[#111124] p-6">
                <Users className="mb-4 h-8 w-8 text-violet-400" />

                <p className="text-sm text-slate-400">
                  Total Users
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {totalUsers}
                </h3>
              </div>

              <div className="rounded-2xl border border-violet-400/20 bg-[#111124] p-6">
                <ClipboardList className="mb-4 h-8 w-8 text-blue-400" />

                <p className="text-sm text-slate-400">
                  Total Answers
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {attemptedQuestions}
                </h3>
              </div>

              <div className="rounded-2xl border border-violet-400/20 bg-[#111124] p-6">
                <Trophy className="mb-4 h-8 w-8 text-yellow-400" />

                <p className="text-sm text-slate-400">
                  Total Marks
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {totalMarks}
                  <span className="text-lg text-slate-500">
                    / {maxMarks}
                  </span>
                </h3>
              </div>

              <div className="rounded-2xl border border-violet-400/20 bg-[#111124] p-6">
                <ChartNoAxesCombined className="mb-4 h-8 w-8 text-green-400" />

                <p className="text-sm text-slate-400">
                  Average Marks
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {adminAverage}
                  <span className="text-lg text-slate-500">
                    / 10
                  </span>
                </h3>
              </div>

            </div>

            {/* Admin Performance */}

            <section className="mb-8 rounded-2xl border border-white/10 bg-[#111124] p-7">

              <h3 className="mb-5 text-xl font-bold">
                Overall User Performance
              </h3>

              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Average Score Percentage
                </span>

                <span className="font-bold text-violet-400">
                  {percentage}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all"
                  style={{
                    width: `${Math.min(Number(percentage), 100)}%`,
                  }}
                />
              </div>

            </section>

            {/* All Users Marks */}

            <section className="rounded-2xl border border-white/10 bg-[#111124] p-7">

              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold">
                  All Users Interview Marks
                </h3>

                <span className="rounded-lg bg-violet-500/10 px-4 py-2 text-sm text-violet-400">
                  {attemptedQuestions} Answers
                </span>
              </div>

              {scores.length === 0 ? (

                <p className="py-10 text-center text-slate-400">
                  No user answers found.
                </p>

              ) : (

                <div className="overflow-x-auto">

                  <table className="w-full min-w-137.5 text-left">

                    <thead>
                      <tr className="border-b border-white/10 text-sm text-slate-400">
                        <th className="px-5 py-4">#</th>
                        <th className="px-5 py-4">User ID</th>
                        <th className="px-5 py-4">Question ID</th>
                        <th className="px-5 py-4">Marks</th>
                      </tr>
                    </thead>

                    <tbody>
                      {scores.map((item, index) => (

                        <tr
                          key={`${item.user_id}-${item.question_id}-${index}`}
                          className="border-b border-white/5 transition hover:bg-white/5"
                        >

                          <td className="px-5 py-4 text-slate-400">
                            {index + 1}
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-lg bg-violet-500/10 px-3 py-1.5 text-violet-400">
                              User #{item.user_id}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-slate-300">
                            Question #{item.question_id}
                          </td>

                          <td className="px-5 py-4">
                            <span className="font-bold text-violet-400">
                              {item.marks ?? 0}/10
                            </span>
                          </td>

                        </tr>

                      ))}
                    </tbody>

                  </table>

                </div>

              )}

            </section>

          </>

        ) : (

          /* NORMAL USER DASHBOARD */

          <>

            {/* Result Heading */}

            <div className="mb-10 text-center">
              <Trophy className="mx-auto mb-5 h-16 w-16 text-yellow-400" />

              <h2 className="text-3xl font-bold sm:text-4xl">
                Interview Completed!
              </h2>

              <p className="mt-3 text-slate-400">
                Here is your system design interview performance.
              </p>
            </div>

            {/* Score Cards */}

            <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              <div className="rounded-2xl border border-violet-400/20 bg-[#111124] p-6">
                <Target className="mb-4 h-8 w-8 text-violet-400" />

                <p className="text-sm text-slate-400">
                  Total Marks
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {totalMarks}
                  <span className="text-lg text-slate-500">
                    / {maxMarks}
                  </span>
                </h3>
              </div>

              <div className="rounded-2xl border border-violet-400/20 bg-[#111124] p-6">
                <ChartNoAxesCombined className="mb-4 h-8 w-8 text-green-400" />

                <p className="text-sm text-slate-400">
                  Average Marks
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {averageMarks}
                  <span className="text-lg text-slate-500">
                    / 10
                  </span>
                </h3>
              </div>

              <div className="rounded-2xl border border-violet-400/20 bg-[#111124] p-6">
                <CheckCircle2 className="mb-4 h-8 w-8 text-blue-400" />

                <p className="text-sm text-slate-400">
                  Questions Answered
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {attemptedQuestions}
                  <span className="text-lg text-slate-500">
                    / 35
                  </span>
                </h3>
              </div>

            </div>

            {/* Overall Performance */}

            <section className="mb-8 rounded-2xl border border-white/10 bg-[#111124] p-7">

              <h3 className="mb-5 text-xl font-bold">
                Overall Performance
              </h3>

              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Score Percentage
                </span>

                <span className="font-bold text-violet-400">
                  {percentage}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all"
                  style={{
                    width: `${Math.min(Number(percentage), 100)}%`,
                  }}
                />
              </div>

            </section>

            {/* Individual Question Scores */}

            <section className="rounded-2xl border border-white/10 bg-[#111124] p-7">

              <h3 className="mb-6 text-xl font-bold">
                Question-wise Results
              </h3>

              {scores.length === 0 ? (

                <p className="py-8 text-center text-slate-400">
                  No submitted answers found for this interview.
                </p>

              ) : (

                <div className="space-y-4">

                  {scores.map((item, index) => (

                    <div
                      key={`${item.question_id}-${index}`}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-[#080817] p-5"
                    >

                      <div>
                        <p className="font-semibold">
                          Question {index + 1}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Question ID: {item.question_id}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-violet-400">
                          {item.marks ?? 0}/10
                        </p>

                        <p className="text-xs text-slate-500">
                          Marks obtained
                        </p>
                      </div>

                    </div>

                  ))}

                </div>

              )}

            </section>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/ques")}
                className="rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-8 py-4 font-semibold hover:brightness-110"
              >
                Back to Dashboard
              </button>
            </div>

          </>

        )}

      </div>
    </main>
  );
};

export default Result;
