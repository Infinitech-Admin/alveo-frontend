"use client";

import React from "react";
import { getAmenity } from "@/utils/icons";
import { SparklesIcon } from "@heroicons/react/24/outline";

interface AmenitiesProps {
  data: {
    property_amenities: string | string[];
    property_furnishing_status?: string;
    property_furnishing_items?: string[] | string | null;
  };
}

const UnitAmenities: React.FC<AmenitiesProps> = ({ data }) => {
  const amenities: string[] = Array.isArray(data.property_amenities)
    ? data.property_amenities
    : JSON.parse(data.property_amenities as string);

  const furnishingItems: string[] = Array.isArray(
    data.property_furnishing_items
  )
    ? data.property_furnishing_items
    : typeof data.property_furnishing_items === "string"
      ? JSON.parse(data.property_furnishing_items)
      : [];

  const furnishingStatus = data.property_furnishing_status;

  return (
    <section className="w-full flex flex-col justify-center py-8 mt-12">
      {/* ─── Furnishing Status Section ─── */}
      {furnishingStatus && (
        <>
          <h1 className="font-bold text-2xl uppercase">
            {furnishingStatus
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join("-")}
          </h1>
          <p className="text-sm text-default-500 max-w-2xl">
            Includes selected furniture and appliances that come with the unit
            upon turnover.
          </p>{" "}
          <h3 className="font-bold text-lg uppercase mt-3">List of Items:</h3>
          <div className="py-4 flex flex-wrap gap-2 ">
            {furnishingItems.map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-gray-200 p-2 rounded-lg dark:bg-gray-900"
              >
                <SparklesIcon className="h-5 w-5 text-blue-500" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ─── Amenities Section ─── */}
      <h1 className="font-bold text-2xl uppercase mt-10">Amenities</h1>
      <p className="text-sm text-default-500 max-w-2xl">
        Explore the range of premium amenities offered in our development,
        designed to elevate your living experience with modern comforts and
        convenience.
      </p>
      <div className="py-4 flex flex-wrap gap-2 mt-4">
        {amenities.map((item, index) => {
          const amenity = getAmenity(item);
          const Icon = amenity?.icon;

          return (
            <div
              key={index}
              className="inline-flex items-center gap-2 bg-gray-200 p-2 rounded-lg dark:bg-gray-900"
            >
              {Icon && <Icon className="h-5 w-5 text-blue-500" />}
              <p>{item}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UnitAmenities;
