import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import AuthBackground from "../components/loginUi/AuthBackground";
import AuthLogo from "../components/loginUi/AuthLogo";
import AuthCard from "../components/loginUi/AuthCard";
import ErrorAlert from "../components/loginUi/ErrorAlert";
import TextInput from "../components/loginUi/TextInput";
import PasswordInput from "../components/loginUi/PasswordInput";
import PrimaryButton from "../components/loginUi/PrimaryButton";
import AuthFooter from "../components/loginUi/AuthFooter";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login(formData.email, formData.password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <AuthBackground>
      <AuthLogo />

      <AuthCard title="Welcome Back 👋">
        <ErrorAlert message={error} />

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <TextInput
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            icon={
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            }
          />

          {/* Password */}
          <PasswordInput
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />

          {/* Submit */}
          <PrimaryButton type="submit">Sign In</PrimaryButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            New to funX?{" "}
            <Link
              to="/register"
              className="text-yellow-400 font-bold hover:text-yellow-300 transition underline underline-offset-4"
            >
              Create Account
            </Link>
          </p>
        </div>
      </AuthCard>

      <AuthFooter />
    </AuthBackground>
  );
};

export default Login;
