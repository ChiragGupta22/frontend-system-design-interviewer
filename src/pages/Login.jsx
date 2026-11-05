
import { useState } from "react";
import {
  BrainCircuit,
  Mail,
  LockKeyhole,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/MyContext";


const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({
        email,
        password,
      });

      navigate("/ques");
    } catch (error) {
      setError(
        error.response?.data?.detail || "Invalid email or password"
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080817] text-white">

      {/* Background Glow */}
      <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-violet-700/20 blur-[100px]" />
      <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-[100px]" />

      <div className="relative mx-auto grid min-h-screen max-w-375 grid-cols-1 items-center gap-12 px-6 py-10 md:px-12 lg:grid-cols-2 lg:gap-16 lg:px-16">

        {/* Left Section */}
        <section className="flex flex-col justify-center">

          <Link to="/" className="mb-12 flex w-fit items-center gap-3">
            <BrainCircuit className="h-10 w-10 text-violet-400" />
            <span className="text-2xl font-bold tracking-tight">
              AI <span className="text-violet-400">Interviewer</span>
            </span>
          </Link>

          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.12] tracking-tight sm:text-6xl">
            Welcome
            <span className="block bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Back!
            </span>
            Keep Improving
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
            Continue your journey. Practice system design and become interview-ready.
          </p>

        </section>

        {/* Right Section */}
        <section className="mx-auto w-full max-w-xl">

          <div className="rounded-3xl border border-violet-400/20 bg-white/4 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome Back
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Login to continue your system design preparation.
            </p>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-100">
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-violet-300/20 bg-black/20 px-4 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/20">

                  <Mail className="h-5 w-5 shrink-0 text-slate-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  />

                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">

                  <label className="block text-sm font-semibold text-slate-100">
                    Password
                  </label>

                  <a
                    href="#"
                    className="text-xs font-medium text-violet-400 transition hover:text-violet-300"
                  >
                    Forgot Password?
                  </a>

                </div>

                <div className="flex items-center gap-3 rounded-xl border border-violet-300/20 bg-black/20 px-4 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/20">

                  <LockKeyhole className="h-5 w-5 shrink-0 text-slate-400" />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  />

                  <Eye className="h-5 w-5 shrink-0 text-slate-400" />

                </div>
              </div>

              
              <div>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-violet-500"
                  />
                  Remember me
                </label>
              </div>

             
              {error && (
                <p className="text-sm text-red-400">
                  {error}
                </p>
              )}

             
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-violet-500 to-indigo-600 px-5 py-4 font-semibold shadow-lg shadow-violet-900/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

            </form>

            
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-sm text-slate-400">OR</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-center text-sm text-slate-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-violet-400 transition hover:text-violet-300"
              >
                Create Account
              </Link>
            </p>

          </div>

          <p className="mt-5 text-center text-xs text-slate-500">
            Practice smarter. Design better. Get interview-ready.
          </p>

        </section>
      </div>
    </main>
  );
};

export default Login;
