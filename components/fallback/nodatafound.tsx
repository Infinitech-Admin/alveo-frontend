import React from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";

const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500">
      <HiOutlineDocumentSearch className="text-6xl mb-4 text-gray-400" />
      <p className="text-lg font-semibold">No Data Found</p>
      <p className="text-sm mt-2">
        We couldn&apos;t find what you&apos;re looking for. Please try adjusting
        your search or filters.
      </p>
    </div>
  );
};

export default NoDataFound;
