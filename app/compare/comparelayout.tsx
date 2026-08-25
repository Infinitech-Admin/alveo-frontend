"use client";

import { Button, Card, CardBody, CardFooter, Spinner } from "@heroui/react";
import React, { useEffect, useState } from "react";
import {
  LuBuilding2,
  LuCheck,
  LuHousePlus,
  LuLandPlot,
  LuBed,
  LuMapPinCheck,
  LuTags,
  LuX,
} from "react-icons/lu";
import { useRouter } from "next/navigation";
import { toSlug } from "@/utils/slug";

interface Property {
  id: string;

  property: {
    name: string;
    facilities: {
      name: string;
    }[];
    plan?: {
      area: number;
      theme: string;
      image: string;
    };
  };

  name: string;

  property_amenities: string | string[];
  property_location?: string;
  location?: string;
  status: string;
  property_price: number;
  property_type: string;
  property_size?: string;
  proeprty_size?: string;
  property_level: string;

  images: string;
  property_description: string;
  property_building: string;

  property_plan_cut?: string;
  property_plan_status?: string;
  property_plan_type?: string;

  logo: string;

  plan?: {
    area: number;
    theme: string;
    image: string;
  };

  buildings: {
    id: string;
    parking: number;
    floors: number;
    image: string;
    name: string;
  }[];

  facilities: {
    name: string;
  }[];
}

interface CompareLayoutProps {
  initialData: Property[];
}

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

// Fallback image
const defaultImage = "/photo_2026-08-25_11-13-34.jpg";

const CompareLayout: React.FC<CompareLayoutProps> = ({
  initialData,
}) => {
  const [properties, setProperties] =
    useState<Property[]>(initialData);

  const [compareList, setCompareList] = useState<string[]>([]);

  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [buttonLoading, setButtonLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const router = useRouter();

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
      console.error("Error loading compare list:", error);
    }

    setLoading(false);
  }, []);

  // --------------------------------------------------
  // Filter properties
  // --------------------------------------------------

  useEffect(() => {
    if (compareList.length > 0 && properties.length > 0) {
      setFilteredProperties(
        properties.filter((property) =>
          compareList.includes(property.id),
        ),
      );
    } else {
      setFilteredProperties([]);
    }
  }, [compareList, properties]);

  // --------------------------------------------------
  // Remove property
  // --------------------------------------------------

  const handleDelete = (propertyId: string) => {
    const updatedCompareList = compareList.filter(
      (id) => id !== propertyId,
    );

    setCompareList(updatedCompareList);

    localStorage.setItem(
      "compareList",
      JSON.stringify(updatedCompareList),
    );
  };

  // --------------------------------------------------
  // Add property
  // --------------------------------------------------

  const handleAddProperty = () => {
    router.push("/properties");
  };

  // --------------------------------------------------
  // Get property image
  // --------------------------------------------------

  const getPropertyImage = (
    property: Property,
  ): string => {
    if (!property?.images) {
      return defaultImage;
    }

    try {
      const parsed = JSON.parse(property.images);

      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        typeof parsed[0] === "string" &&
        parsed[0].trim() !== ""
      ) {
        return `${apiUrl}/properties/images/${parsed[0]}`;
      }

      return defaultImage;
    } catch (error) {
      console.error(
        "Error parsing property images:",
        error,
      );

      return defaultImage;
    }
  };

  // --------------------------------------------------
  // View property
  // --------------------------------------------------

  const handleViewProperty = (property: Property) => {
    setButtonLoading((prev) => ({
      ...prev,
      [property.id]: true,
    }));

    router.push(
      `/${toSlug(property.property.name)}/${toSlug(
        property.id,
      )}/${toSlug(
        property.property_description || "",
      )}`,
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
  // Amenities
  // --------------------------------------------------

  const getAmenities = (
    amenities: string | string[],
  ): string[] => {
    if (Array.isArray(amenities)) {
      return amenities;
    }

    if (!amenities) {
      return [];
    }

    try {
      const parsed = JSON.parse(amenities);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error(
        "Error parsing amenities:",
        error,
      );

      return [];
    }
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner
          size="lg"
          label="Loading properties..."
        />
      </div>
    );
  }

  const showAddPropertyButton =
    filteredProperties.length < 3;

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {filteredProperties.map((property) => {
        const propertyImage =
          getPropertyImage(property);

        const isFallback =
          propertyImage === defaultImage;

        const amenities = getAmenities(
          property.property_amenities,
        );

        return (
          <Card
            key={property.id}
            className="h-full overflow-hidden"
          >
            <CardBody className="relative flex flex-col p-4">
              {/* =========================================
                  PROPERTY IMAGE
              ========================================== */}

              <div
                className="relative h-48 w-full overflow-hidden rounded-xl md:h-52"
              >
                <img
                  alt={
                    property.property?.name ||
                    "Property Image"
                  }
                  src={propertyImage}
                  className={`h-full w-full rounded-xl transition-transform duration-300 ${
                    isFallback
                      ? "object-contain p-10"
                      : "object-cover hover:scale-105"
                  }`}
                  onError={(event) => {
                    const target =
                      event.currentTarget;

                    // Prevent infinite error loop
                    if (
                      target.dataset.fallback ===
                      "true"
                    ) {
                      return;
                    }

                    target.dataset.fallback =
                      "true";

                    target.src = defaultImage;

                    target.className =
                      "h-full w-full rounded-xl object-contain p-10";
                  }}
                />

                {/* Remove button */}

                <div className="absolute right-2 top-2 z-10">
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(property.id)
                    }
                    aria-label={`Remove ${
                      property.property?.name ||
                      "property"
                    } from comparison`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600/90 text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-red-700"
                  >
                    <LuX size={16} />
                  </button>
                </div>
              </div>

              {/* =========================================
                  PROPERTY INFORMATION
              ========================================== */}

              <div className="py-3">
                <h1 className="text-lg font-bold uppercase">
                  {property.property?.name ||
                    property.name ||
                    "Property"}
                </h1>

                {/* Location */}

                <div className="mt-1 flex items-center gap-1 text-tiny text-foreground-500">
                  <LuMapPinCheck size={15} />

                  <p>
                    {property.property_location ||
                      property.location ||
                      "No Location Available"}
                  </p>
                </div>

                {/* Description */}

                <div className="mt-4">
                  <p className="line-clamp-3 text-sm text-foreground-600">
                    {property.property_description ||
                      "No Description Available"}
                  </p>
                </div>
              </div>

              <hr className="my-2" />

              {/* =========================================
                  UNIT DETAILS
              ========================================== */}

              <div>
                <h1 className="font-medium">
                  Unit Details
                </h1>

                {/* Price */}

                <div className="ml-4 mt-2 flex items-center gap-2">
                  <LuTags />

                  <p>
                    {property.property_price
                      ? new Intl.NumberFormat(
                          "en-US",
                          {
                            style: "currency",
                            currency: "PHP",
                            minimumFractionDigits: 0,
                          },
                        ).format(
                          property.property_price,
                        )
                      : "Price Not Available"}
                  </p>
                </div>

                {/* Property Type */}

                <div className="ml-4 flex items-center gap-2">
                  <LuBed />

                  <p>
                    {property.property_type ||
                      "Type Not Available"}
                  </p>
                </div>

                {/* Size */}

                <div className="ml-4 flex items-center gap-2">
                  <LuLandPlot />

                  <p>
                    {property.property_size ||
                      property.proeprty_size ||
                      "N/A"}{" "}
                    Sqm.
                  </p>
                </div>

                {/* Floor */}

                <div className="ml-4 flex items-center gap-2">
                  <LuBuilding2 />

                  <p>
                    {property.property_level
                      ? `${getOrdinalSuffix(
                          property.property_level,
                        )} Floor`
                      : "Floor Not Available"}
                  </p>
                </div>
              </div>

              <hr className="my-2" />

              {/* =========================================
                  MASTER PLAN
              ========================================== */}

              <div className="flex flex-col">
                <h1 className="font-medium">
                  Master Plan
                </h1>

                {/* Building */}

                {property.property_building ? (
                  <div className="ml-4 flex items-center gap-2">
                    <LuCheck />

                    <h1>
                      {property.property_building}
                    </h1>
                  </div>
                ) : (
                  <p className="py-2 text-center text-gray-500">
                    No Building Name Available
                  </p>
                )}

                {/* Unit Cut */}

                <div className="ml-4 flex items-center gap-2">
                  <LuCheck />

                  <h1>
                    {property.property_plan_cut ||
                      "No Unit Cut Available"}
                  </h1>
                </div>

                {/* Unit Status */}

                <div className="ml-4 flex items-center gap-2">
                  <LuCheck />

                  <h1>
                    {property.property_plan_status ||
                      "No Unit Status Available"}
                  </h1>
                </div>
              </div>

              <hr className="my-2" />

              {/* =========================================
                  BUILDING PLAN
              ========================================== */}

              <div className="flex flex-col">
                <h1 className="font-medium">
                  Building Plan
                </h1>

                {/* Area */}

                <div className="ml-4 flex items-center gap-2">
                  <LuCheck />

                  <h1>
                    Area:{" "}
                    {property.property?.plan?.area
                      ? `${new Intl.NumberFormat(
                          "en-US",
                          {
                            maximumFractionDigits: 2,
                          },
                        ).format(
                          property.property.plan.area,
                        )} Sqm.`
                      : "No Area Available"}
                  </h1>
                </div>

                {/* Development Type */}

                <div className="ml-4 flex items-center gap-2">
                  <LuCheck />

                  <h1>
                    {property.property_plan_type ||
                      "No Type Available"}
                  </h1>
                </div>

                {/* Theme */}

                <div className="ml-4 flex items-center gap-2">
                  <LuCheck />

                  <h1>
                    {property.property?.plan?.theme ||
                      "No Theme Available"}
                  </h1>
                </div>
              </div>

              <hr className="my-2" />

              {/* =========================================
                  GENERAL FACILITIES
              ========================================== */}

              <div className="flex flex-col">
                <h1 className="font-medium">
                  General Facilities
                </h1>

                {property.property?.facilities &&
                property.property.facilities.length >
                  0 ? (
                  property.property.facilities.map(
                    (facility, index) => (
                      <div
                        className="ml-4 flex items-center gap-2"
                        key={index}
                      >
                        <LuCheck />

                        <span>
                          {facility.name}
                        </span>
                      </div>
                    ),
                  )
                ) : (
                  <p className="py-2 text-center text-gray-500">
                    No Facilities Available
                  </p>
                )}
              </div>

              <hr className="my-2" />

              {/* =========================================
                  AMENITIES
              ========================================== */}

              <div className="flex flex-col">
                <h1 className="font-medium">
                  Amenities
                </h1>

                {amenities.length > 0 ? (
                  amenities.map(
                    (
                      amenity: string,
                      index: number,
                    ) => (
                      <div
                        className="ml-4 flex items-center gap-2"
                        key={index}
                      >
                        <LuCheck />

                        <span>{amenity}</span>
                      </div>
                    ),
                  )
                ) : (
                  <p className="py-2 text-center text-gray-500">
                    No Amenities Available
                  </p>
                )}
              </div>
            </CardBody>

            {/* =========================================
                FOOTER
            ========================================== */}

            <CardFooter className="w-full">
              <div className="flex w-full">
                <Button
                  className="w-full bg-green-600 uppercase text-white"
                  isLoading={
                    buttonLoading[property.id] ||
                    false
                  }
                  onPress={() =>
                    handleViewProperty(property)
                  }
                >
                  View{" "}
                  {property.name ||
                    property.property?.name ||
                    "Property"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}

      {/* =========================================
          ADD PROPERTY
      ========================================== */}

      {showAddPropertyButton && (
        <div
          onClick={handleAddProperty}
          className="flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg bg-default-100 px-12 py-12 text-center shadow transition-all duration-200 hover:bg-default-200"
        >
          <LuHousePlus size={64} />

          <h1 className="mt-3 font-medium">
            Add Properties to Compare
          </h1>

          <p className="mt-1 text-sm text-foreground-500">
            Select another property to compare
          </p>
        </div>
      )}
    </div>
  );
};

export default CompareLayout;