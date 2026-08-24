"use client";

import { Button, Card, CardBody, CardFooter, Spinner } from "@heroui/react";
import React, { useEffect, useState } from "react";
import {
  LuBadgeCheck,
  LuBuilding2,
  LuCheck,
  LuHardHat,
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
    };
  };
  name: string;
  property_amenities: string | string[];
  location: string;
  status: string;
  property_price: number;
  property_type: string;
  proeprty_size: string;
  property_level: string;

  images: string;
  property_description: string;
  property_building: string;
  logo: string;
  plan: {
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

// FIX: this was previously hardcoded to "https://infinitech-testing5.online",
// a different domain from the rest of the app, so images 404'd/never loaded.
// Now it matches the same env-driven API base URL used everywhere else.
const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

const CompareLayout: React.FC<CompareLayoutProps> = ({ initialData }) => {
  const [properties, setProperties] = useState<any[]>(initialData);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<{
    [key: string]: boolean;
  }>({}); // Track loading state for each property
  const router = useRouter();

  useEffect(() => {
    const storedCompareList = JSON.parse(
      localStorage.getItem("compareList") || "[]",
    );
    if (Array.isArray(storedCompareList)) {
      setCompareList(storedCompareList);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (compareList.length > 0 && properties.length > 0) {
      setFilteredProperties(
        properties.filter((property) => compareList.includes(property.id)),
      );
    } else {
      setFilteredProperties([]);
    }
  }, [compareList, properties]);

  const handleDelete = (propertyId: string) => {
    const updatedCompareList = compareList.filter((id) => id !== propertyId);
    setCompareList(updatedCompareList);
    localStorage.setItem("compareList", JSON.stringify(updatedCompareList));
  };

  const handleAddProperty = () => {
    router.push("/properties");
  };

  const defaultImage =
    "https://www.dmcihomes.com/uploads/media/executives-1563253639282.jpg";

  const showAddPropertyButton = filteredProperties.length < 3;

  const handleViewProperty = (property: Property) => {
    setButtonLoading((prev) => ({ ...prev, [property.id]: true }));
    router.push(
      `/${toSlug(property.property.name)}/${toSlug(property.id)}/${toSlug(property.property_description || "")}`,
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" label="Loading properties..." />
      </div>
    );
  }

  // const amenities: string[] = Array.isArray(initialData) ? initialData : JSON.parse(initialData.property_amenities as string);
  const getOrdinalSuffix = (num: string | number) => {
    const n = parseInt(num as string);
    const rem10 = n % 10;
    const rem100 = n % 100;

    if (isNaN(n)) return "";

    if (rem100 >= 11 && rem100 <= 13) return `${n}th`;

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

  // Helper to safely build the image URL — avoids crashes if `images` is
  // missing, empty, or not valid JSON.
  const getPropertyImage = (property: any): string => {
    if (!property.images) return defaultImage;
    try {
      const parsed = JSON.parse(property.images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return `${apiUrl}/properties/images/${parsed[0]}`;
      }
      return defaultImage;
    } catch (error) {
      console.error("Error parsing property images:", error);
      return defaultImage;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredProperties.map((property) => (
        <Card key={property.id}>
          <CardBody className="relative">
            <div className="overflow-hidden rounded-xl">
              <img
                alt="Property Image"
                className="object-cover rounded-xl min-w-full min-h-32 md:h-48 aspect-w-16 aspect-h-9 hover:scale-105 transition-all"
                src={getPropertyImage(property)}
              />
              <div className="absolute top-0 right-1">
                <button
                  onClick={() => handleDelete(property.id)}
                  className="mt-2 py-2 px-2 bg-red-600 text-white rounded-full"
                >
                  <LuX size={16} />
                </button>
              </div>
            </div>
            <div className="py-2">
              <h1 className="text-lg font-bold uppercase">
                {property.property.name}
              </h1>
              <div className="flex gap-1 items-center text-tiny text-foreground-500">
                <LuMapPinCheck />
                <p>{property.property_location || "No Location Available"}</p>
              </div>

              <div className="mt-4">
                <p>
                  {" "}
                  {property.property_description || "No Description Available"}
                </p>
              </div>

              <hr className="my-2" />
              <div>
                <h1 className="font-medium">Unit Details</h1>
                <div className="flex gap-2 items-center ml-4">
                  <LuTags />
                  <p>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "PHP",
                      minimumFractionDigits: 0,
                    }).format(property.property_price) || "00.00"}
                  </p>
                </div>
                <div className="flex gap-2 items-center ml-4">
                  <LuBed />
                  <p>{property.property_type}</p>
                </div>
                <div className="flex gap-2 items-center ml-4">
                  <LuLandPlot />
                  <p>{property.property_size} Sqm.</p>
                </div>

                <div className="flex gap-2 items-center ml-4">
                  <LuBuilding2 />
                  <p>{getOrdinalSuffix(property.property_level)} Floor</p>
                </div>
              </div>

              <hr className="my-2" />

              {/* Master Plan Section */}
              <div className="flex flex-col">
                <h1 className="font-medium">Master Plan</h1>

                {/* Building */}
                {property.property_building &&
                property.property_building.length > 0 ? (
                  <div className="flex items-center gap-2 ml-4">
                    <LuCheck />
                    <h1>{property.property_building}</h1>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-2">
                    No Building Name Available
                  </p>
                )}

                {/* Unit Cut */}
                <div className="flex items-center gap-2 ml-4">
                  <LuCheck />
                  <h1>
                    {property.property_plan_cut || "No Unit Cut Available"}
                  </h1>
                </div>

                {/* Unit Status */}
                <div className="flex items-center gap-2 ml-4">
                  <LuCheck />
                  <h1>
                    {property.property_plan_status ||
                      "No Unit Status Available"}
                  </h1>
                </div>
              </div>

              <hr className="my-2" />

              {/* Building Plan Section */}
              <div className="flex flex-col">
                <h1 className="font-medium">Building Plan</h1>

                {/* Area */}
                <div className="flex items-center gap-2 ml-4">
                  <LuCheck />
                  <h1>
                    Area:{" "}
                    {property.property?.plan?.area
                      ? `${new Intl.NumberFormat("en-US", {
                          maximumFractionDigits: 2,
                        }).format(property.property.plan.area)} Sqm.`
                      : "No Area Available"}
                  </h1>
                </div>

                {/* Development Type */}
                <div className="flex items-center gap-2 ml-4">
                  <LuCheck />
                  <h1>{property.property_plan_type || "No Type Available"}</h1>
                </div>

                {/* Theme */}
                <div className="flex items-center gap-2 ml-4">
                  <LuCheck />
                  <h1>
                    {property.property?.plan?.theme || "No Theme Available"}
                  </h1>
                </div>
              </div>

              <hr className="my-2" />

              <div className="flex flex-col">
                <h1 className="font-medium">General Facilities</h1>
                {property?.property.facilities &&
                property.property.facilities.length > 0 ? (
                  property.property.facilities.map((gf: any, index: number) => (
                    <div className="flex flex-col" key={index}>
                      <div className="flex items-center gap-2 ml-4">
                        <LuCheck />
                        {gf.name}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-2">
                    No Facilities Available
                  </p>
                )}
              </div>

              <hr className="my-2" />

              {/* General Facilities Section - Fix */}
              <div className="flex flex-col">
                <h1 className="font-medium">Amenities</h1>
                {property.property_amenities ? (
                  (typeof property.property_amenities === "string"
                    ? JSON.parse(property.property_amenities)
                    : property.property_amenities
                  ).map((amenity: string, index: number) => (
                    <div className="flex flex-col" key={index}>
                      <div className="flex items-center gap-2 ml-4">
                        <LuCheck />
                        {amenity}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-2">
                    No Amenities Available
                  </p>
                )}
              </div>
            </div>
          </CardBody>

          <CardFooter className="w-full">
            <div className="flex w-full">
              <Button
                className="bg-green-600 uppercase text-white w-full"
                isLoading={buttonLoading[property.id] || false}
                onPress={() => handleViewProperty(property)}
              >
                View {property.name}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
      {showAddPropertyButton && (
        <div
          onClick={handleAddProperty}
          className="text-center px-12 bg-default-100 rounded-lg py-12 shadow cursor-pointer flex flex-col justify-center items-center"
        >
          <LuHousePlus size={64} />
          <h1>Add Properties to Compare</h1>
        </div>
      )}
    </div>
  );
};

export default CompareLayout;
