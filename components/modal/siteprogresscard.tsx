"use client";
import React, { useState } from "react";
import { Card, CardFooter, CardHeader, Image } from "@heroui/react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { formatNumber } from "@/utils/formatNumber";

interface Property {
  name: string;
  property_location: string;
  status: string;
  min_price: number;
  max_price: number;
  percent: number;
  images: string;
}

interface SiteProgressProps {
  data: Property[];
}

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

const PropertyLocation: React.FC<{ location: string }> = ({ location }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 50;

  const isLong = location?.length > maxLength;
  const displayText =
    !expanded && isLong ? location.slice(0, maxLength) + "..." : location;

  return (
    <p className="text-white text-tiny">
      {displayText || "No Location Provided"}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-1 underline text-blue-300"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </p>
  );
};

const SiteProgressCard: React.FC<SiteProgressProps> = ({ data }) => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    breakpoints: {
      "(max-width: 400px)": {
        slides: { perView: 1, spacing: 15 },
      },
      "(min-width: 601px) and (max-width: 999px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 5, spacing: 15 },
      },
    },
  });

  const handlePrev = () => slider.current?.prev();
  const handleNext = () => slider.current?.next();

  return (
    <div className="relative py-8">
      <div ref={sliderRef} className="keen-slider">
        {data.map((property, index) => {
          let imageUrl = "";
          try {
            const images: string[] = JSON.parse(property.images || "[]");
            if (Array.isArray(images) && images.length > 0) {
              imageUrl = `${apiUrl}/properties/images/${images[0]}`;
            }
          } catch (error) {
            console.error("Error parsing images:", error);
          }

          return (
            <div key={index} className="keen-slider__slide">
              <Card isFooterBlurred className="w-full h-[400px] relative">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  {property.status && (
                    <div
                      className={`text-tiny uppercase font-semibold px-2 py-1 rounded-md mb-2 inline-flex items-center gap-1 ${
                        property.status === "Ready For Occupancy"
                          ? "bg-green-100 text-green-800"
                          : property.status === "Under Construction"
                            ? "bg-red-100 text-red-800"
                            : property.status === "New"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {property.status}
                    </div>
                  )}
                </CardHeader>
                <Image
                  removeWrapper
                  alt="ALVEO Property"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                  src={imageUrl}
                />
                <CardFooter className="absolute bg-white/20 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between h-[80px] px-4">
                  <div className="overflow-hidden">
                    <p className="text-white font-bold text-md truncate">
                      {property.name}
                    </p>
                    <PropertyLocation location={property.property_location} />
                  </div>
                </CardFooter>
                <div
                  className="flex flex-col items-center justify-center bg-green-500 absolute bottom-0 z-9 w-full opacity-50"
                  style={{ height: `${property.percent || 0}%` }}
                />
                <div className="absolute bottom-0 top-0 z-9 h-full w-full flex items-center justify-center text-center text-white font-bold text-2xl">
                  {formatNumber(property.percent) || "0.00"}%
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4 z-[999999]">
        <button
          className="bg-blue-600 opacity-70 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition hover:opacity-100"
          onClick={handlePrev}
        >
          &#8249;
        </button>
        <button
          className="bg-blue-600 text-white opacity-70 py-2 px-4 rounded-full hover:bg-blue-700 transition hover:opacity-100 z-[999999]"
          onClick={handleNext}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default SiteProgressCard;
