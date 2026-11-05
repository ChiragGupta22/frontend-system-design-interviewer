import {
  BrainCircuit,
  Clock3,
  ArrowLeft,
  Send,
  Lightbulb,
  MessageSquare,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { useParams, useNavigate } from "react-router";

import { useEffect, useState, useCallback, useRef } from "react";

import { useAuth } from "../context/MyContext";

import { generateQuestions, submitAnswer } from "../services/authservices";

const MAX_QUESTIONS = 35;
const INTERVIEW_DURATION = 40 * 60;

const Interview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [questionNumber, setQuestionNumber] = useState(0);

  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  const [timeLeft, setTimeLeft] = useState(INTERVIEW_DURATION);

  const requestRef = useRef(false);
  const completedRef = useRef(false);
  const questionNumberRef = useRef(0);
  const startedAtRef = useRef(null);

  useEffect(() => {
    if (!interviewId) return;

    const storageKey = `interview-start-${interviewId}`;

    let startTime = localStorage.getItem(storageKey);

    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem(storageKey, startTime);
    }

    startedAtRef.current = Number(startTime);

    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - startedAtRef.current) / 1000);

      const remaining = Math.max(INTERVIEW_DURATION - elapsed, 0);

      setTimeLeft(remaining);

      if (remaining === 0) {
        if (completedRef.current) return;

        completedRef.current = true;

        setCompleted(true);
        setQuestion(null);

        navigate(`/result/${interviewId}`, {
          replace: true,
        });
      }
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [interviewId, navigate]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");

  const seconds = String(timeLeft % 60).padStart(2, "0");

  const getQuestion = useCallback(async () => {
    if (
      !token ||
      !interviewId ||
      requestRef.current ||
      completedRef.current ||
      questionNumberRef.current >= MAX_QUESTIONS
    ) {
      if (questionNumberRef.current >= MAX_QUESTIONS) {
        completedRef.current = true;
        setCompleted(true);
        navigate(`/result/${interviewId}`, {
          replace: true,
        });
      }

      return;
    }

    try {
      requestRef.current = true;
      setLoading(true);
      setError("");

      const res = await generateQuestions(
        {
          interview_id: Number(interviewId),
          total_questions: MAX_QUESTIONS,
          show_expected_answer: false,
        },
        token,
      );

      // Check if interview expired during API request
      const elapsed = Math.floor((Date.now() - startedAtRef.current) / 1000);

      if (completedRef.current || elapsed >= INTERVIEW_DURATION) {
        completedRef.current = true;
        navigate(`/result/${interviewId}`, {
          replace: true,
        });
        return;
      }

      const data = res.data;

      if (data.completed || data.question_number > MAX_QUESTIONS) {
        completedRef.current = true;
        setCompleted(true);
        setQuestion(null);

        navigate(`/result/${interviewId}`, {
          replace: true,
        });

        return;
      }

      questionNumberRef.current = data.question_number;

      setQuestionNumber(data.question_number);
      setQuestion(data);
      setAnswer("");
    } catch (err) {
      console.error("Generate question error:", err);

      setError(err.response?.data?.detail || "Failed to generate question.");
    } finally {
      setLoading(false);
      requestRef.current = false;
    }
  }, [token, interviewId, navigate]);

  // -----------------------------------
  // INITIAL QUESTION
  // -----------------------------------

  useEffect(() => {
    if (token && interviewId) {
      getQuestion();
    }
  }, [token, interviewId, getQuestion]);

  const Logout = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to leave this interview?",
    );

    if (confirmExit) {
      navigate(`/result/${interviewId}`);
    }
  };

  const handleSubmit = async () => {
    if (!question || submitting || loading || completedRef.current) {
      return;
    }

    if (answer.trim().length < 15) {
      setError("Please write at least 15 characters.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const res = await submitAnswer(
        {
          question_id: question.id,
          answer_text: answer.trim(),
        },
        token,
      );

      console.log("Answer submitted:", res.data);

      // Check timer before generating another question
      const elapsed = Math.floor((Date.now() - startedAtRef.current) / 1000);

      if (completedRef.current || elapsed >= INTERVIEW_DURATION) {
        completedRef.current = true;

        navigate(`/result/${interviewId}`, {
          replace: true,
        });

        return;
      }

      // Maximum 35 questions
      if (questionNumberRef.current >= MAX_QUESTIONS) {
        completedRef.current = true;

        navigate(`/result/${interviewId}`, {
          replace: true,
        });

        return;
      }

      // Generate next question
      await getQuestion();
    } catch (err) {
      console.error("Submit answer error:", err);

      setError(err.response?.data?.detail || "Failed to submit answer.");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = (questionNumber / MAX_QUESTIONS) * 100;

  // -----------------------------------
  // UI
  // -----------------------------------

  return (
    <main className="min-h-screen bg-[#080817] text-white">
      {/* Navbar */}

      <nav className="border-b border-white/10 bg-[#080817] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-8 w-8 text-violet-400" />

            <span className="text-xl font-bold">
              AI <span className="text-violet-400">Interviewer</span>
            </span>
          </div>

          {/* Countdown Timer */}

          <div
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-mono font-bold ${
              timeLeft <= 300
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-violet-400/20 bg-violet-500/10 text-violet-300"
            }`}
          >
            <Clock3 className="h-5 w-5" />
            {minutes}:{seconds}
          </div>

          <button
            onClick={Logout}
            className="text-sm text-slate-400 hover:text-white"
          >
            Exit Interview
          </button>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <button
              onClick={Logout}
              className="mb-4 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Projects
            </button>

            <h1 className="text-2xl font-bold sm:text-3xl">
              {question?.project_name || "System Design Interview"}
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Design a scalable and reliable system.
            </p>
          </div>

          <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3">
            <p className="text-xs text-violet-300">Interview Progress</p>

            <p className="mt-1 font-semibold">
              {questionNumber} of {MAX_QUESTIONS}
            </p>
          </div>
        </div>

        {/* Progress */}

        <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-violet-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Question and Answer */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Question */}

          <section className="rounded-2xl border border-white/10 bg-[#111124] p-6 sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div className="flex items-center gap-2 text-violet-400">
                <MessageSquare size={19} />

                <span className="font-semibold">Interview Question</span>
              </div>

              <span className="rounded-lg bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300">
                Question {String(questionNumber || 1).padStart(2, "0")}
              </span>
            </div>

            {loading ? (
              <div className="flex min-h-48 items-center justify-center gap-3 text-violet-400">
                <Loader2 className="animate-spin" />
                Generating question...
              </div>
            ) : (
              <h2 className="text-xl font-bold sm:text-xl">
                {question?.question_text || "Waiting for question..."}
              </h2>
            )}

            <div className="mt-8 rounded-xl border border-violet-400/20 bg-violet-500/5 p-5">
              <div className="flex items-center gap-2 text-violet-300">
                <Lightbulb size={18} />

                <span className="font-semibold">What to consider</span>
              </div>

              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li>• System architecture and components</li>
                <li>• Real-time communication</li>
                <li>• Database design and storage</li>
                <li>• Scalability and reliability</li>
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-sm text-slate-500">Difficulty</span>

              <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                Advanced
              </span>
            </div>
          </section>

          {/* Answer */}

          <section className="flex flex-col rounded-2xl border border-white/10 bg-[#111124] p-6 sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div className="flex items-center gap-2 text-violet-400">
                <BrainCircuit size={20} />

                <span className="font-semibold">Your Answer</span>
              </div>

              <span className="text-xs text-slate-500">Text Editor</span>
            </div>

            <div className="flex flex-1 flex-col">
              <label className="mb-3 text-sm font-medium text-slate-300">
                Explain your system design approach
              </label>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={loading || submitting || !question}
                placeholder="Start explaining your system design here..."
                className="min-h-87.5 w-full flex-1 resize-y rounded-xl border border-white/10 bg-[#080817] p-5 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/60 disabled:opacity-50"
              />

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Minimum 15 characters
                </span>

                <span className="text-xs text-slate-500">
                  {answer.trim().length} characters
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || loading || !question || completed}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-4 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Answer
                  <Send size={18} />
                </>
              )}
            </button>

            <p className="mt-3 text-center text-xs text-slate-500">
              Your answer will be evaluated by AI.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Interview;
