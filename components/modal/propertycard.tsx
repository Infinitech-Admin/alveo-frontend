"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Chip, Tooltip } from "@heroui/react";
import { LuCircleCheck, LuHousePlus, LuBuilding2, LuHardHat, LuBadgeCheck, LuBuilding, LuBed, LuBedDouble } from "react-icons/lu";
import { MdInfo } from "react-icons/md";
import Link from "next/link";
import NoDataFound from "../fallback/nodatafound";
import toast, { Toaster } from "react-hot-toast";
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
  description: string
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
  }
}

interface RecommendedCardProps {
  data: Property[] | Listings[];
  type: "property" | "listing";
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";

const RecommendedCard: React.FC<RecommendedCardProps> = ({ data, type }) => {
  const pathname = usePathname();
  const [compareList, setCompareList] = useState<string[]>(
    JSON.parse(localStorage.getItem("compareList") || "[]")
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

  return (
    <>

      {data?.length > 0 ? (
        data.map((item) => {
          const isProperty = type === "property";
          const name = isProperty ? (item as Property).property_name : (item as Listings).property.name;
          const unit_type = isProperty ? (item as Property).max_price : null;
          const description = isProperty ? (item as Property).description : (item as Listings).property.description;
          const location = isProperty ? (item as Property).property_location : (item as Listings).property.location;
          const status = isProperty ? (item as Property).status : (item as Listings).unit_type;
          const price = isProperty ? (item as Property).min_price : (item as Listings).unit_price;

          let imageUrl = "";
          try {
            const images: string[] = JSON.parse(
              isProperty ? (item as Property).images : (item as Listings).images
            );
            if (Array.isArray(images) && images.length > 0) {
              imageUrl = isProperty
                ? `${apiUrl}/properties/images/${images[0]}`
                : `${apiUrl}/listings/${images[0]}`;
            }
          } catch (error) {
            console.error("Error parsing images:", error);
          }

          const defaultImage =
            "https://www.dmcihomes.com/uploads/media/executives-1563253639282.jpg";

          const propertyId = isProperty ? (item as Property).id : (item as Listings).id;
          const linkHref = isProperty ? `${toSlug(name)}/${toSlug(item.id)}/${toSlug(description || "")}` : `${toSlug(name)}/${toSlug(item.id)}/${toSlug(description || "")}`;

          return (
            <Card key={propertyId}>
              <Link href={linkHref}>
                <CardBody className="overflow-visible p-1">
                  <div className="overflow-hidden rounded-xl">
                    <img
                      alt={name || "Property Image"}
                      className="object-cover rounded-xl w-full max-h-32 md:min-h-48 aspect-w-16 aspect-h-9 hover:scale-125 transition-all"
                      src={imageUrl || defaultImage}
                    />
                  </div>

                  <div className="flex-col items-start px-1">
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className={`text-tiny uppercase font-semibold px-2 py-1 rounded-md inline-flex items-center gap-1 ${status === "RFO"
                          ? "bg-green-100 text-[#0F1B2E]"
                          : status === "Under Construction"
                            ? "bg-red-100 text-red-800"
                            : status === "New"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        <LuBuilding2 />
                        <p className="text-[9px] md:text-tiny">
                          {status}
                        </p>
                      </div>
                      <div
                        className={`text-tiny uppercase font-semibold px-2 py-1 rounded-md inline-flex items-center gap-1 ${status === "RFO"
                          ? "bg-green-100 text-[#0F1B2E]"
                          : status === "Under Construction"
                            ? "bg-red-100 text-red-800"
                            : status === "New"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        <LuBedDouble />
                        <p className="text-[9px] md:text-tiny">
                          {filterMaxPrice(unit_type as number)}
                        </p>
                      </div>
                    </div>

                    <h4 className="font-bold text-sm line-clamp-1 md:text-large uppercase">
                      {name || "No Data Found"}
                    </h4>
                    <p className="text-default-500 text-sm line-clamp-1">
                      {location || "No Data Found"}
                    </p>
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
                        className="py-2 px-2 bg-green-200 rounded-full cursor-pointer"
                        onClick={() => handleCompare(propertyId)}
                      >
                        {compareList.includes(propertyId) ? (
                          <LuCircleCheck className="text-[#0F1B2E]" size={20} />
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
