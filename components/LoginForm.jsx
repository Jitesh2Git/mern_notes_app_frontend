"use client";

import Link from "next/link";
import React, { useState } from "react";
import { PasswordInput } from ".";
import { validateEmail } from "@/utils/helper";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  //Login API Call
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        toast.success("Logged In Successfully.");
        localStorage.setItem("token", response.data.accessToken);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div
        className="w-96 border shadow rounded bg-white 
      px-6 py-10"
      >
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl text-center mb-7">Login</h4>
          <input
            type="text"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm font-medium mb-1">
            Demo Email : demo@gmail.com
            <br />
            Demo Password : demo
          </p>
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          <button type="submit" className="btn-primary">
            Login
          </button>
          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link
              href="/signUp"
              className="font-medium
            text-primary underline"
            >
              Create New Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
