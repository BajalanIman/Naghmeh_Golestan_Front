import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import { BASE_URL } from "../../constants/constants";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    if (message) {
      setMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setMessage("");
    setSuccess(false);

    const loginData = {
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    try {
      setIsLoading(true);

      const response = await axios.post(`${BASE_URL}auth/login`, loginData, {
        withCredentials: true,
      });

      localStorage.setItem("marco_user", JSON.stringify(response.data.user));

      setMessage(response.data.message || "Login successful!");
      setSuccess(true);
    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed.",
      );

      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] bg-white p-5 pt-2 rounded shadow-md space-y-4"
      >
        <div>
          <Link style={{ color: "gray" }} to="/">
            <X />
          </Link>

          <h2 className="text-xl font-bold text-center">Login</h2>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={isLoading}
          autoComplete="email"
          className="w-full p-2 border rounded"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            disabled={isLoading}
            autoComplete="current-password"
            className="w-full p-2 border rounded pr-10"
            required
          />

          <button
            type="button"
            className="absolute right-3 top-2 cursor-pointer"
            onClick={() => setShowPassword((previousValue) => !previousValue)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Eye size={20} color="blue" />
            ) : (
              <EyeOff size={20} color="gray" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#276a70] text-[#ECEAD3] p-2 rounded hover:bg-[#3a9ea8] ${
            isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-2 ${
              success ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <div className="flex gap-1">
        <p>New user?</p>

        <Link to="/singup" style={{ color: "blue" }}>
          Click here!
        </Link>
      </div>
    </div>
  );
}

export default Login;
