"use client";

import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    window.location.href = "/login";
  }, []);

  return (
    <main
      className="absolute top-1/2 left-1/2 transform 
    -translate-x-1/2 -translate-y-1/2"
    >
      <h1
        className="text-xl text-zinc-900
      font-medium"
      >
        Loading...
      </h1>
    </main>
  );
};

export default Page;
