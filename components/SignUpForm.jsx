"use client";

import React, { useState } from "react";
import { PasswordInput } from ".";
import Link from "next/link";
import { validateEmail } from "@/utils/helper";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  //Create Account API Call
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name.");
      return;
    }

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
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        toast.success("Account Created Successfully.\nYou Can Login Now.");
        localStorage.setItem("token", response.data.accessToken);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
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
    <div className="flex items-center justify-center mt-28 max-sm:mt-16">
      <p
        className="absolute bottom-3 right-3 text-xs text-primary
      p-2 bg-white rounded w-[300px] max-sm:left-1/2 max-sm:transform 
      max-sm:-translate-x-1/2"
      >
        <span className="font-bold">
          "An unexpected error occured. Please try again."
        </span>
        <br />
        - The App is being hosted on free service &apos;Render&apos; hence the
        requests are slow sometimes. <br />- If above error occurs please
        refresh the page few times and try again.
      </p>
      <div className="w-96 border shadow rounded bg-white px-7 py-10">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl text-center mb-7">SignUp</h4>
          <input
            type="text"
            placeholder="Name"
            className="input-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          <button type="submit" className="btn-primary">
            Create Account
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium
            text-primary underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
