
import { useState } from "react";
import {
  BrainCircuit,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  Zap,
  ChartNoAxesCombined,
  Clock3,
  ArrowRight,
  Code2,
  Network,
} from "lucide-react";

import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/MyContext";


function Signup() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setSuccess("Account created successfully!");

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      setError(
        error.response?.data?.detail || "Registration failed"
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
            Ace Your
            <span className="block bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              System Design
            </span>
            Interviews
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
            Practice, Learn and Improve with AI-Powered Interviews.
          </p>

          {/* Features */}
          <div className="mt-9 space-y-5">

            <Feature
              icon={<Zap />}
              title="Real-time Questions"
              description="Tinder, Netflix, WhatsApp"
            />

            <Feature
              icon={<ChartNoAxesCombined />}
              title="Get Evaluated Instantly"
              description="Improve with interview scores"
            />

            <Feature
              icon={<Clock3 />}
              title="Track Your Progress"
              description="Review your interview history"
            />

          </div>

          {/* Illustration */}
          <div className="mt-12 hidden max-w-md items-end gap-4 sm:flex">

            <div className="flex h-36 flex-1 -rotate-3 items-center justify-center rounded-2xl border border-violet-500/50 bg-linear-to-br from-violet-950 to-slate-950 shadow-xl shadow-violet-950/40">
              <Code2 className="h-16 w-16 text-violet-400" />
            </div>

            <div className="mb-5 flex h-28 flex-1 rotate-3 items-center justify-center rounded-2xl border border-indigo-400/40 bg-indigo-950/40 shadow-xl shadow-indigo-950/30">
              <Network className="h-14 w-14 text-indigo-300" />
            </div>

          </div>
        </section>

        {/* Right Section */}
        <section className="mx-auto w-full max-w-xl">

          <div className="rounded-3xl border border-violet-400/20 bg-white/4 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create Account
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Start your journey to become a better system designer.
            </p>

            {/* Signup Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Full Name */}
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                icon={<UserRound />}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />

              {/* Email */}
              <InputField
                label="Email Address"
                placeholder="Enter your email"
                icon={<Mail />}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />

              {/* Password */}
              <InputField
                label="Password"
                placeholder="Create a password"
                icon={<LockKeyhole />}
                type="password"
                password
                name="password"
                value={form.password}
                onChange={handleChange}
              />

              {/* Confirm Password */}
              <InputField
                label="Confirm Password"
                placeholder="Confirm your password"
                icon={<LockKeyhole />}
                type="password"
                password
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />

              {/* Error */}
              {error && (
                <p className="text-sm text-red-400">
                  {error}
                </p>
              )}

              {/* Success */}
              {success && (
                <p className="text-sm text-green-400">
                  {success}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-violet-500 to-indigo-600 px-5 py-4 font-semibold shadow-lg shadow-violet-900/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-sm text-slate-400">OR</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-center text-sm text-slate-300">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-semibold text-violet-400 transition hover:text-violet-300"
              >
                Login here
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
}

/* Feature Component */
function Feature({ icon, title, description }) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/15 text-violet-400">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-slate-100">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>

    </div>
  );
}

/* Input Component */
function InputField({
  label,
  placeholder,
  icon,
  type,
  password,
  name,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-100">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-violet-300/20 bg-black/20 px-4 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/20">

        <span className="shrink-0 text-slate-400">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
        />

        {password && (
          <Eye className="h-5 w-5 shrink-0 text-slate-400" />
        )}

      </div>
    </div>
  );
}

export default Signup;
