"use client";
import React from "react";
import { Card, CardBody, Image } from "@heroui/react";
import { GiCargoCrane } from "react-icons/gi";

interface PropertyCardProps {
  name: string;
  location: string;
  status: string;
  min_price: number;
  max_price: number;
  image: string | null;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  name,
  location,
  status,
  min_price,
  max_price,
  image,
}) => {
  return (
    <Card className="py-4 hover:bg-default-50">
      <CardBody className="overflow-visible py-2">
        <Image
          alt={name || "Property Image"}
          className="object-cover rounded-xl w-full"
          src={image || "https://via.placeholder.com/300x200?text=No+Image"}
        />
        <div className="pt-2 px-4">
          <div className="inline-flex flex-wrap mb-3">
            <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
              <GiCargoCrane />
              {status}
            </span>
          </div>
          <h4 className="font-bold text-large line-clamp-1 leading-4">
            {name || "No Data Found"}
          </h4>
          <small className="text-default-500 line-clamp-1">
            {location || "No Data Found"}
          </small>
          <p className="text-lg uppercase font-bold pt-2">
            &#8369;{min_price?.toLocaleString() || "0"} - &#8369;
            {max_price?.toLocaleString() || "0"}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default PropertyCard;
