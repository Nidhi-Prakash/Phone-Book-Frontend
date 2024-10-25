import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../axios";
import { toast } from "react-toast";

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (email, password) => {
    if (!email) setShowEmailError(true);
    if (!password) {
      setShowPasswordError(true);
      return;
    }
    const result = await loginUser(email, password);
    if (result?.status === 201) {
      toast.success("Logged in successfully.");
      setUserInfo({ email: "", password: "" });
      navigate("/contacts", { replace: true });
    } else {
      toast.error("Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex justify-center items-center flex-col w-full max-w-[400px] p-8 rounded-lg shadow-lg border border-gray-200 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="mb-6 text-center w-full">
          <h2 className="text-3xl font-semibold text-gray-800">Login</h2>
          <p className="text-sm text-gray-500">Welcome back! Please log in</p>
        </div>

        <div className="w-full space-y-6">
          {/* Email Input */}
          <div className="relative">
            <input
              type="text"
              name="emailId"
              placeholder="Email"
              value={userInfo.email}
              onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value });
                setShowEmailError(false);
              }}
              className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none transition"
            />
            <AiOutlineUser className="absolute top-3 left-3 text-gray-400" />
            {showEmailError && (
              <p className="text-xs text-red-500 mt-1">Email is required!</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
                setShowPasswordError(false);
              }}
              className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none transition"
            />
            <FaRegEyeSlash className="absolute top-3 left-3 text-gray-400" />
            {showPasswordError && (
              <p className="text-xs text-red-500 mt-1">Password is required!</p>
            )}
          </div>
        </div>

        {/* Login Button */}
        <button
          className="w-full mt-8 py-3 text-white font-medium bg-[#613f75] rounded-md  transition"
          onClick={() => handleSubmit(userInfo.email, userInfo.password)}
        >
          Log In
        </button>

        {/* Register Link */}
        <div className="mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
