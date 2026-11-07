import { useState } from "react";
import { useNavigate } from "react-router";
import {
  BrainCircuit,
  Search,
  Bell,
  UserRound,
  ArrowRight,
  MessageCircle,
  Film,
  Heart,
  Clock3,
  Layers3,
  Sparkles,
} from "lucide-react";

import { startInterview } from "../services/authservices";
import { useAuth } from "../context/MyContext";

const projects = [
  {
    name: "Tinder",
    description:
      "Design a scalable dating application with matching and real-time interactions.",
    category: "Social Networking",
    difficulty: "Advanced",
    duration: "45 min",
    icon: Heart,
    color: "from-pink-500 to-rose-600",
    glow: "bg-pink-500/10",
  },
  {
    name: "Netflix",
    description:
      "Design a video streaming platform with recommendations and content delivery.",
    category: "Video Streaming",
    difficulty: "Advanced",
    duration: "45 min",
    icon: Film,
    color: "from-red-500 to-red-700",
    glow: "bg-red-500/10",
  },
  {
    name: "WhatsApp",
    description:
      "Design a real-time messaging system with chat, groups and media sharing.",
    category: "Communication",
    difficulty: "Advanced",
    duration: "45 min",
    icon: MessageCircle,
    color: "from-emerald-500 to-green-700",
    glow: "bg-emerald-500/10",
  },
];

function Ques() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const Result = () => {
    navigate(`/result/${interviewId}`)
  }

  const Logout = () => {
    prompt("You wanna go back just type yes")
    if (prompt === "yes") {
    navigate(-1)
    }
    else{
      alert("You dont wannt to leave lets play")
    }
  }

  const [loadingProject, setLoadingProject] = useState(null);
  const [error, setError] = useState("");

  const handleStart = async (project) => {
    try {
      console.log("Token exists:", !!token);

      if (!token) {
        throw new Error("Token missing. Please login again.");
      }

      setError("");
      setLoadingProject(project.name);

      const response = await startInterview(
        { project_name: project.name },
        token,
      );

      console.log("Interview response:", response.data);

      
      const interviewId = response.data.interview_id ?? response.data.id;

      if (!interviewId) {
        throw new Error("Interview ID not found in API response");
      }

      navigate(`/interview/${interviewId}`);
    } catch (error) {
      console.error("Start interview error:", error);

      setError(
        error.response?.data?.detail ||
          error.message ||
          "Unable to start interview",
      );
    } finally {
      setLoadingProject(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#080817] text-white">
      <div className="pointer-events-none fixed -left-40 top-20 h-96 w-96 rounded-full bg-violet-700/10 blur-[120px]" />
      <div className="pointer-events-none fixed -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />

      <nav className="relative z-10 border-b border-white/10 bg-[#080817]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-8 w-8 text-violet-400" />
            <span className="text-xl font-bold">
              AI <span className="text-violet-400">Interviewer</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button onClick={Result} className="hidden text-sm text-slate-400 transition hover:text-white sm:block">
              Dashboard
            </button>

            <button className="relative text-slate-400 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-violet-500" />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/15">
              <button
                type="button"
                onClick={Logout}
                title="Logout"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/15 transition hover:bg-violet-500/30"
              >
                <UserRound className="h-5 w-5 text-violet-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      
      <section className="relative mx-auto max-w-7xl px-6 py-14 lg:py-20">
        
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <Sparkles className="h-4 w-4" />
            AI Powered Practice
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Choose Your
            <span className="block bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              System Design
            </span>
            Interview
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            Select a real-world application and challenge yourself with an
            AI-powered system design interview.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-12 flex max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-5 py-4 transition focus-within:border-violet-400/50">
          <Search className="h-5 w-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search system design projects..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Section Header */}
        <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Available Projects</h2>
            <p className="mt-2 text-sm text-slate-400">
              Choose a project to begin your interview.
            </p>
          </div>

          <span className="rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-sm text-slate-400">
            {projects.length} Projects Available
          </span>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </p>
        )}

        {/* Project Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const Icon = project.icon;
            const isLoading = loadingProject === project.name;

            return (
              <div
                key={project.name}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111124] p-6 transition duration-300 hover:-translate-y-2 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-950/20"
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full ${project.glow} blur-3xl transition group-hover:scale-150`}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${project.color} shadow-lg`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-slate-300">
                    {project.category}
                  </span>
                </div>

                <div className="relative mt-7">
                  <h3 className="text-2xl font-bold">{project.name}</h3>

                  <p className="mt-3 min-h-14 text-sm leading-6 text-slate-400">
                    {project.description}
                  </p>
                </div>

                <div className="relative mt-7 flex items-center gap-5 border-y border-white/10 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Layers3 className="h-4 w-4 text-violet-400" />
                    {project.difficulty}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock3 className="h-4 w-4 text-violet-400" />
                    {project.duration}
                  </div>
                </div>

                {/* Button */}
                <button
                  type="button"
                  disabled={loadingProject !== null}
                  onClick={() => handleStart(project)}
                  className="group/button relative mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-3.5 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? "Starting..." : "Start Interview"}
                  {!isLoading && (
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/button:translate-x-1" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <BrainCircuit className="h-4 w-4 text-violet-400" />
            Powered by AI
          </div>

          <p className="text-xs text-slate-600">
            Practice system design. Improve your architecture skills. Get
            interview-ready.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Ques;
