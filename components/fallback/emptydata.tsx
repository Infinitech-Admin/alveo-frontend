"use client";
import React from "react";
import { LuFileSearch } from "react-icons/lu";

interface FallbackProps {
  fallbackname: string;
}

const EmptyData: React.FC<FallbackProps> = ({ fallbackname }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500">
      <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full shadow-sm justify-center items-center inline-flex">
        <LuFileSearch size={48} />
      </div>
      <p className="text-lg font-semibold">No {fallbackname} Found</p>
      <p className="text-sm mt-2">
        No {fallbackname} available at the moment. Please check back later.
      </p>
    </div>
  );
};

export default EmptyData;
