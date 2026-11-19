import {
  BrainCircuit,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  ArrowRight,
  Code2,
  Network,
} from "lucide-react";

import { Link } from "react-router";
import useAuthForm from "../hooks/authHooks";

function Signup() {
  const {
    register,
    handleSubmit,
    onSubmit,
    watch,
    errors,
    error,
    success,
    loading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useAuthForm("signup");

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
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-100">
                  Full Name
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-violet-300/20 bg-black/20 px-4 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/20">
                  <UserRound className="h-5 w-5 shrink-0 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>

                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-100">
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-violet-300/20 bg-black/20 px-4 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/20">
                  <Mail className="h-5 w-5 shrink-0 text-slate-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>

                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-100">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-violet-300/20 bg-black/20 px-4 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/20">
                  <LockKeyhole className="h-5 w-5 shrink-0 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Minimum 8 characters are required",
                      },
                    })}
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  />

                  <Eye
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-5 w-5 shrink-0 text-slate-400"
                  />
                </div>

                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-100">
                  Confirm Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-violet-300/20 bg-black/20 px-4 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/20">
                  <LockKeyhole className="h-5 w-5 shrink-0 text-slate-400" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  />

                  <Eye
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="h-5 w-5 shrink-0 text-slate-400"
                  />
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Error */}
              {error && <p className="text-sm text-red-400">{error}</p>}

              {/* Success */}
              {success && <p className="text-sm text-green-400">{success}</p>}

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

export default Signup;
