"use client";

import { getInitials } from "@/utils/helper";
import React from "react";
import toast from "react-hot-toast";

const ProfileInfo = ({ userInfo, onDelete }) => {
  const onLogout = () => {
    toast.success("Logged Out Successfully.");
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  const isDemoUser = userInfo?.email === "demo@gmail.com";

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 flex items-center justify-center
      rounded-full text-slate-950 font-medium bg-slate-100"
      >
        {getInitials(userInfo?.fullName)}
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm font-medium">{userInfo?.fullName}</p>
        <div
          className="flex flex-col items-start gap-1
        max-sm:flex-row max-sm:gap-3"
        >
          <button className="text-sm text-primary underline" onClick={onLogout}>
            Logout
          </button>
          <button
            className={`text-sm text-red-500 underline
          ${isDemoUser && "cursor-not-allowed"}`}
            onClick={isDemoUser ? null : onDelete}
            title={
              isDemoUser &&
              "Can't delete Demo user. \nCreate new account to test the functionality."
            }
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
