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
  LuBuilding2,
  LuHardHat,
  LuBadgeCheck,
  LuBuilding,
  LuBed,
  LuBedDouble,
  LuLandmark,
  LuLandPlot,
} from "react-icons/lu";
import { MdInfo } from "react-icons/md";
import Link from "next/link";
import NoDataFound from "../fallback/nodatafound";
import toast, { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { toSlug } from "@/utils/slug";
import { filterMaxPrice } from "@/utils/priceformat";

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
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

const RecommendedCard: React.FC<RecommendedCardProps> = ({ data }) => {
  const pathname = usePathname();
  const [compareList, setCompareList] = useState<string[]>(
    JSON.parse(localStorage.getItem("compareList") || "[]"),
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setCompareList(JSON.parse(localStorage.getItem("compareList") || "[]"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleCompare = (id: string) => {
    let updatedCompareList = [...compareList];

    if (updatedCompareList.includes(id)) {
      updatedCompareList = updatedCompareList.filter((item) => item !== id);
    } else {
      if (updatedCompareList.length < 3) {
        updatedCompareList.push(id);
      } else {
        toast.error("You can only compare up to 3 items.");
        return;
      }
    }

    localStorage.setItem("compareList", JSON.stringify(updatedCompareList));
    setCompareList(updatedCompareList);
    window.dispatchEvent(new Event("storage"));
  };

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

  // Filter out any records missing a valid nested `property` object BEFORE sorting/rendering.
  // This is what prevents "Cannot read properties of null (reading 'name')" when the API
  // returns a listing whose joined property is null/undefined.
  const validData = (data ?? []).filter(
    (item) => item && item.property && item.property.name,
  );

  return (
    <>
      {validData.length > 0 ? (
        [...validData]
          .sort((a, b) => a.property.name.localeCompare(b.property.name))
          .map((item) => {
            const name = item.property.name;
            const description = item.property_description;
            const location = item.property_location;
            const status = item.property_type;
            const price = item.property_price;

            let imageUrl = "";
            try {
              const images: string[] = JSON.parse(item.images);
              if (Array.isArray(images) && images.length > 0) {
                imageUrl = `${apiUrl}/properties/images/${images[0]}`;
              }
            } catch (error) {
              console.error("Error parsing images:", error);
            }

            const defaultImage =
              "https://www.dmcihomes.com/uploads/media/executives-1563253639282.jpg";

            const propertyId = item.id;
            const linkHref = `${toSlug(name)}/${toSlug(item.id)}/${toSlug(description || "")}`;

            return (
              <Card key={propertyId}>
                <Link href={linkHref}>
                  <CardBody className="overflow-visible p-1  min-h-[356px]">
                    <div className="overflow-hidden rounded-xl">
                      <Image
                        alt={name || "Property Image"}
                        className="object-cover rounded-xl w-full min-h-52 md:max-h-52"
                        src={imageUrl || defaultImage}
                        width={1000}
                      />
                    </div>

                    <div className="flex flex-col items-start px-1">
                      {/* Property Name */}
                      <h4 className="font-bold text-sm line-clamp-1 mt-3 md:text-large uppercase">
                        {name || "No Data Found"}
                      </h4>

                      {/* Property Location */}
                      <p className="text-default-500 text-sm line-clamp-1">
                        {location || "No Data Found"}
                      </p>

                      {/* Responsive Chips */}
                      <div className="flex flex-wrap gap-2 py-2">
                        <Chip
                          startContent={<LuBuilding />}
                          className="text-[9px] md:text-tiny uppercase font-semibold px-2 py-0.5 rounded-md bg-[#79a0dd] text-[#0F1B2E]"
                        >
                          {getOrdinalSuffix(item.property_level)} Floor
                        </Chip>
                        <Chip
                          startContent={<LuLandPlot />}
                          className="text-[9px] md:text-tiny uppercase font-semibold px-2 py-0.5 rounded-md bg-[#79a0dd] text-[#0F1B2E]"
                        >
                          {item.property_size} Sqm.
                        </Chip>
                        <Chip
                          startContent={<LuBedDouble />}
                          className="text-[9px] md:text-tiny uppercase font-semibold px-2 py-0.5 rounded-md bg-[#79a0dd] text-[#0F1B2E]"
                        >
                          {status}
                        </Chip>
                      </div>
                    </div>
                  </CardBody>
                </Link>

                <CardFooter>
                  <div className="flex justify-between w-full items-center">
                    <p className="text-md uppercase font-bold md:text-lg">
                      &#8369; {price?.toLocaleString(undefined) || "0.00"}
                    </p>

                    {pathname === "/properties" ? (
                      <Tooltip content="Compare">
                        <div
                          className="py-2 px-2 bg-[#79a0dd] rounded-full cursor-pointer"
                          onClick={() => handleCompare(propertyId)}
                        >
                          {compareList.includes(propertyId) ? (
                            <LuCircleCheck
                              className="text-[#0F1B2E]"
                              size={20}
                            />
                          ) : (
                            <LuHousePlus className="text-[#0F1B2E]" size={20} />
                          )}
                        </div>
                      </Tooltip>
                    ) : null}
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
