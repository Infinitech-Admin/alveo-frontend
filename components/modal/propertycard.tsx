"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Tooltip,
} from "@heroui/react";
import {
  LuCircleCheck,
  LuHousePlus,
  LuBuilding2,
  LuBedDouble,
} from "react-icons/lu";
import Link from "next/link";
import NoDataFound from "../fallback/nodatafound";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { toSlug } from "@/utils/slug";
import { filterMaxPrice } from "@/utils/priceformat";

interface Property {
  id: string;
  property_name: string;
  property_location: string;
  status: string;
  min_price: number;
  max_price: number;
  images: string;
  description: string;
}

interface Listings {
  id: string;
  name: string;
  location: string;
  unit_name: string;
  unit_location: string;
  unit_type: string;
  status: string;
  unit_price: number;
  images: string;
  property: {
    name: string;
    location: string;
    description: string;
  };
}

interface RecommendedCardProps {
  data: Property[] | Listings[];
  type: "property" | "listing";
}

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://infinitech-api26.site";

// Fallback image
const defaultImage =
  "/photo_2026-08-25_11-13-34.jpg";

const RecommendedCard: React.FC<
  RecommendedCardProps
> = ({ data, type }) => {
  const pathname = usePathname();

  const [compareList, setCompareList] =
    useState<string[]>([]);

  // --------------------------------------------------
  // Load compare list safely on client
  // --------------------------------------------------

  useEffect(() => {
    try {
      const storedCompareList = JSON.parse(
        localStorage.getItem("compareList") || "[]",
      );

      if (Array.isArray(storedCompareList)) {
        setCompareList(storedCompareList);
      }
    } catch (error) {
      console.error(
        "Error loading compare list:",
        error,
      );

      setCompareList([]);
    }
  }, []);

  // --------------------------------------------------
  // Listen for compare list changes
  // --------------------------------------------------

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedCompareList = JSON.parse(
          localStorage.getItem("compareList") || "[]",
        );

        if (Array.isArray(storedCompareList)) {
          setCompareList(storedCompareList);
        }
      } catch (error) {
        console.error(
          "Error reading compare list:",
          error,
        );
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
    };
  }, []);

  // --------------------------------------------------
  // Compare
  // --------------------------------------------------

  const handleCompare = (
    event: React.MouseEvent,
    id: string,
  ) => {
    // Prevent the card Link from opening
    event.preventDefault();
    event.stopPropagation();

    let updatedCompareList = [...compareList];

    if (updatedCompareList.includes(id)) {
      updatedCompareList =
        updatedCompareList.filter(
          (item) => item !== id,
        );
    } else {
      if (updatedCompareList.length >= 3) {
        toast.error(
          "You can only compare up to 3 items.",
        );
        return;
      }

      updatedCompareList.push(id);
    }

    localStorage.setItem(
      "compareList",
      JSON.stringify(updatedCompareList),
    );

    setCompareList(updatedCompareList);

    // Notify other components on the same page
    window.dispatchEvent(
      new Event("storage"),
    );
  };

  const getImageUrl = (
    item: Property | Listings,
    isProperty: boolean,
  ): string => {
    const rawImages = isProperty
      ? (item as Property).images
      : (item as Listings).images;

    if (!rawImages) {
      return defaultImage;
    }

    try {
      const images = JSON.parse(rawImages);

      if (
        !Array.isArray(images) ||
        images.length === 0 ||
        typeof images[0] !== "string" ||
        images[0].trim() === ""
      ) {
        return defaultImage;
      }

      return isProperty
        ? `${apiUrl}/properties/images/${images[0]}`
        : `${apiUrl}/listings/${images[0]}`;
    } catch (error) {
      console.error(
        "Error parsing images:",
        error,
      );

      return defaultImage;
    }
  };

  return (
    <>
      {data?.length > 0 ? (
        data.map((item) => {
          const isProperty =
            type === "property";

          const property =
            item as Property;

          const listing =
            item as Listings;

          const name = isProperty
            ? property.property_name
            : listing.property?.name;

          const unitType = isProperty
            ? property.max_price
            : null;

          const description = isProperty
            ? property.description
            : listing.property?.description;

          const location = isProperty
            ? property.property_location
            : listing.property?.location;

          const status = isProperty
            ? property.status
            : listing.unit_type;

          const price = isProperty
            ? property.min_price
            : listing.unit_price;

          const propertyId = item.id;

          const imageUrl = getImageUrl(
            item,
            isProperty,
          );

          const linkHref = `/${toSlug(
            name || "",
          )}/${toSlug(
            item.id,
          )}/${toSlug(
            description || "",
          )}`;

          const isFallback =
            imageUrl === defaultImage;

          return (
            <Card
              key={propertyId}
              className="overflow-hidden"
            >
              <Link
                href={linkHref}
                className="block"
              >
                <CardBody className="overflow-visible p-1">
                  {/* =================================
                      IMAGE
                  ================================== */}

                  <div
                    className="relative h-40 w-full overflow-hidden rounded-xl md:h-48"
                  >
                    <img
                      alt={
                        name ||
                        "Property Image"
                      }
                      src={imageUrl}
                      className={`h-full w-full rounded-xl transition-transform duration-300 ${
                        isFallback
                          ? "object-contain p-8"
                          : "object-cover hover:scale-105"
                      }`}
                      onError={(event) => {
                        const target =
                          event.currentTarget;

                        // Prevent infinite
                        // fallback loop
                        if (
                          target.dataset
                            .fallback ===
                          "true"
                        ) {
                          return;
                        }

                        target.dataset.fallback =
                          "true";

                        target.src =
                          defaultImage;

                        target.className =
                          "h-full w-full rounded-xl object-contain p-8";
                      }}
                    />
                  </div>

                  {/* =================================
                      INFORMATION
                  ================================== */}

                  <div className="flex flex-col items-start px-1">
                    {/* Status / Type */}

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <div
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-tiny font-semibold uppercase ${
                          status === "RFO"
                            ? "bg-green-100 text-[#0F1B2E]"
                            : status ===
                                "Under Construction"
                              ? "bg-red-100 text-red-800"
                              : status ===
                                  "New"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <LuBuilding2
                          size={14}
                        />

                        <p className="text-[9px] md:text-tiny">
                          {status ||
                            "No Status"}
                        </p>
                      </div>

                      {/* Maximum Price / Unit Type */}

                      {isProperty &&
                        unitType !==
                          null && (
                          <div
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-tiny font-semibold uppercase ${
                              status ===
                              "RFO"
                                ? "bg-green-100 text-[#0F1B2E]"
                                : status ===
                                    "Under Construction"
                                  ? "bg-red-100 text-red-800"
                                  : status ===
                                      "New"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <LuBedDouble
                              size={14}
                            />

                            <p className="text-[9px] md:text-tiny">
                              {filterMaxPrice(
                                unitType,
                              )}
                            </p>
                          </div>
                        )}
                    </div>

                    {/* Name */}

                    <h4 className="line-clamp-1 text-sm font-bold uppercase md:text-large">
                      {name ||
                        "No Data Found"}
                    </h4>

                    {/* Location */}

                    <p className="line-clamp-1 text-sm text-default-500">
                      {location ||
                        "No Location Available"}
                    </p>
                  </div>
                </CardBody>
              </Link>

              {/* =================================
                  FOOTER
              ================================== */}

              <CardFooter>
                <div className="flex w-full items-center justify-between gap-3">
                  {/* Price */}

                  <p className="text-md font-bold uppercase md:text-lg">
                    ₱{" "}
                    {price?.toLocaleString(
                      undefined,
                    ) || "0.00"}
                  </p>

                  {/* Compare */}

                  {pathname ===
                    "/properties" && (
                    <Tooltip content="Compare">
                      <button
                        type="button"
                        aria-label={
                          compareList.includes(
                            propertyId,
                          )
                            ? "Remove from comparison"
                            : "Add to comparison"
                        }
                        onClick={(event) =>
                          handleCompare(
                            event,
                            propertyId,
                          )
                        }
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                          compareList.includes(
                            propertyId,
                          )
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-green-200 hover:bg-green-300"
                        }`}
                      >
                        {compareList.includes(
                          propertyId,
                        ) ? (
                          <LuCircleCheck
                            className="text-[#0F1B2E]"
                            size={20}
                          />
                        ) : (
                          <LuHousePlus
                            className="text-[#0F1B2E]"
                            size={20}
                          />
                        )}
                      </button>
                    </Tooltip>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })
      ) : (
        <div className="col-span-1 md:col-span-4">
          <NoDataFound />
        </div>
      )}
    </>
  );
};

export default RecommendedCard;