import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../context/MyContext";


const useAuthForm = (type = "login") => {
  const { login, register: signup, loading,user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");

    try {
      if (type === "signup") {
        if (data.password !== data.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        await signup({
          name: data.name,
          email: data.email,
          password: data.password,
        });

        setSuccess("Account created successfully!");
        reset();

        setTimeout(() => navigate("/"), 1000);
      } else {
        await login({
          email: data.email,
          password: data.password,
        });

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/ques");
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          (type === "signup"
            ? "Registration failed"
            : "Invalid email or password"),
      );
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    watch,
    errors,
    error,
    success,
    loading,
    setShowConfirmPassword,
    setShowPassword,
    showPassword,
    showConfirmPassword,
  };
};

export default useAuthForm;
