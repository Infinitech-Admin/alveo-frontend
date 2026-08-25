"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Tooltip,
} from "@heroui/react";
import {
  LuCircleCheck,
  LuHousePlus,
  LuBuilding,
  LuBedDouble,
  LuLandPlot,
} from "react-icons/lu";
import Link from "next/link";
import NoDataFound from "../fallback/nodatafound";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { toSlug } from "@/utils/slug";

interface Property {
  id: string;
  property_location: string;
  status: string;
  property_price: number;
  property_type: string;
  images: string;
  property_description: string;
  property_size: string;
  property_level: string;

  property: {
    name: string;
    location: string;
  };
}

interface RecommendedCardProps {
  data: Property[];
}

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://infinitech-api26.site";

// Fallback image
const defaultImage = "/photo_2026-08-25_11-13-34.jpg";

const RecommendedCard: React.FC<
  RecommendedCardProps
> = ({ data }) => {
  const pathname = usePathname();

  const [compareList, setCompareList] =
    useState<string[]>([]);

  // Track images that failed to load
  const [failedImages, setFailedImages] =
    useState<Set<string>>(new Set());

  // --------------------------------------------------
  // Load compare list
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
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
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

    window.dispatchEvent(
      new Event("storage"),
    );
  };

  // --------------------------------------------------
  // Ordinal suffix
  // --------------------------------------------------

  const getOrdinalSuffix = (
    num: string | number,
  ) => {
    const n = parseInt(String(num));

    if (isNaN(n)) return "";

    const rem10 = n % 10;
    const rem100 = n % 100;

    if (rem100 >= 11 && rem100 <= 13) {
      return `${n}th`;
    }

    switch (rem10) {
      case 1:
        return `${n}st`;

      case 2:
        return `${n}nd`;

      case 3:
        return `${n}rd`;

      default:
        return `${n}th`;
    }
  };

  // --------------------------------------------------
  // Get image URL
  // --------------------------------------------------

  const getPropertyImage = (
    item: Property,
  ): string => {
    if (!item?.images) {
      return defaultImage;
    }

    try {
      const images = JSON.parse(item.images);

      if (
        Array.isArray(images) &&
        images.length > 0 &&
        typeof images[0] === "string" &&
        images[0].trim() !== ""
      ) {
        return `${apiUrl}/properties/images/${images[0]}`;
      }

      return defaultImage;
    } catch (error) {
      console.error(
        "Error parsing images:",
        error,
      );

      return defaultImage;
    }
  };

  // --------------------------------------------------
  // Handle image error
  // --------------------------------------------------

  const handleImageError = (
    imageUrl: string,
  ) => {
    setFailedImages((previous) => {
      if (previous.has(imageUrl)) {
        return previous;
      }

      const next = new Set(previous);
      next.add(imageUrl);

      return next;
    });
  };

  // --------------------------------------------------
  // Filter valid data
  // --------------------------------------------------

  const validData = (data ?? []).filter(
    (item) =>
      item &&
      item.property &&
      item.property.name,
  );

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <>
      {validData.length > 0 ? (
        [...validData]
          .sort((a, b) =>
            a.property.name.localeCompare(
              b.property.name,
            ),
          )
          .map((item) => {
            const name = item.property.name;
            const description =
              item.property_description;
            const location =
              item.property_location;
            const status =
              item.property_type;
            const price =
              item.property_price;

            const propertyId = item.id;

            const imageUrl =
              getPropertyImage(item);

            const isFallback =
              imageUrl === defaultImage ||
              failedImages.has(imageUrl);

            const displayedImage =
              isFallback
                ? defaultImage
                : imageUrl;

            const linkHref = `/${toSlug(
              name,
            )}/${toSlug(
              item.id,
            )}/${toSlug(
              description || "",
            )}`;

            return (
              <Card
                key={propertyId}
                className="overflow-hidden"
              >
                <Link
                  href={linkHref}
                  className="block"
                >
                  <CardBody className="min-h-[356px] overflow-visible p-1">
                    {/* =================================
                        IMAGE
                    ================================== */}

                    <div
                      className="relative h-52 w-full overflow-hidden rounded-xl"
                    >
                      <Image
                        alt={
                          name ||
                          "Property Image"
                        }
                        src={displayedImage}
                        width={1000}
                        height={400}
                        removeWrapper
                        className={`h-full w-full rounded-xl transition-transform duration-300 ${
                          isFallback
                            ? "object-contain p-10"
                            : "object-cover hover:scale-105"
                        }`}
                        onError={() =>
                          handleImageError(
                            imageUrl,
                          )
                        }
                      />
                    </div>

                    {/* =================================
                        PROPERTY INFORMATION
                    ================================== */}

                    <div className="flex flex-col items-start px-1">
                      <h4 className="mt-3 line-clamp-1 text-sm font-bold uppercase md:text-large">
                        {name ||
                          "No Data Found"}
                      </h4>

                      <p className="line-clamp-1 text-sm text-default-500">
                        {location ||
                          "No Location Available"}
                      </p>

                      {/* Chips */}

                      <div className="flex flex-wrap gap-2 py-2">
                        {/* Floor */}

                        <Chip
                          startContent={
                            <LuBuilding />
                          }
                          className="rounded-md bg-[#79a0dd] px-2 py-0.5 text-[9px] font-semibold uppercase text-[#0F1B2E] md:text-tiny"
                        >
                          {item.property_level
                            ? `${getOrdinalSuffix(
                                item.property_level,
                              )} Floor`
                            : "Floor N/A"}
                        </Chip>

                        {/* Size */}

                        <Chip
                          startContent={
                            <LuLandPlot />
                          }
                          className="rounded-md bg-[#79a0dd] px-2 py-0.5 text-[9px] font-semibold uppercase text-[#0F1B2E] md:text-tiny"
                        >
                          {item.property_size ||
                            "N/A"}{" "}
                          Sqm.
                        </Chip>

                        {/* Property Type */}

                        <Chip
                          startContent={
                            <LuBedDouble />
                          }
                          className="rounded-md bg-[#79a0dd] px-2 py-0.5 text-[9px] font-semibold uppercase text-[#0F1B2E] md:text-tiny"
                        >
                          {status ||
                            "Type N/A"}
                        </Chip>
                      </div>
                    </div>
                  </CardBody>
                </Link>

                {/* =================================
                    FOOTER
                ================================== */}

                <CardFooter>
                  <div className="flex w-full items-center justify-between">
                    <p className="text-md font-bold uppercase md:text-lg">
                      ₱{" "}
                      {price?.toLocaleString(
                        undefined,
                      ) || "0.00"}
                    </p>

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
                              : "bg-[#79a0dd] hover:bg-[#668fcf]"
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
        <div className="col-span-4">
          <NoDataFound />
        </div>
      )}
    </>
  );
};

export default RecommendedCard;