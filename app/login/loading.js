import React from "react";

const Loading = () => {
  return (
    <div
      className="absolute top-1/2 left-1/2 transform 
    -translate-x-1/2 -translate-y-1/2"
    >
      <h1
        className="text-xl text-zinc-900
      font-medium"
      >
        Loading...
      </h1>
    </div>
  );
};

export default Loading;
