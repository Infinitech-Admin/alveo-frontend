"use client";

import React from "react";

const RoomPlanner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <iframe
        src="https://roomplanner-liard.vercel.app/roomplanner"
        className="w-full h-full border-none"
        allowFullScreen
      />
    </div>
  );
};

export default RoomPlanner;
