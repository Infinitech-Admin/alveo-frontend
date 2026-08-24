"use client";

import EmptyData from "@/components/fallback/emptydata";
import { formatArea } from "@/utils/priceformat";
import { Card, CardBody, Image } from "@heroui/react";
import React from "react";
import {
  LuBadgeCheck,
  LuBrush,
  LuConstruction,
  LuLandPlot,
  LuRuler,
  LuScissors,
} from "react-icons/lu";
import { PhotoProvider, PhotoView } from "react-photo-view";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";
interface Property {
  area?: number;
  property_plan_cut?: string;
  development_type?: string;
  theme?: string;
  image?: string;
}

interface MasterPlanSectionProps {
  plan?: {
    area?: number;
    theme?: string;
    image?: string;
  };
  propertyPlanType?: string;
}

const BuildingPlanSection: React.FC<MasterPlanSectionProps> = ({
  plan,
  propertyPlanType,
}) => {
  const cardData = [
    {
      icons: <LuRuler className="text-xl text-[#79a0dd]" />,
      title: "Property Area",
      data: formatArea(plan?.area),
    },
    {
      icons: <LuConstruction className="text-xl text-[#79a0dd]" />,
      title: "Development Type",
      data: propertyPlanType,
    },
    {
      icons: <LuBrush className="text-xl text-[#79a0dd]" />,
      title: "Theme",
      data: plan?.theme,
    },
  ];

  return (
    <section className="w-full flex flex-col justify-center py-8 mt-0">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-full">
          <h1 className="font-bold text-2xl uppercase">Building Plan</h1>
          <p className="text-sm text-default-500 max-w-2xl">
          Explore the structural blueprint of our development, featuring the architectural layout, total property area, and thematic design. 
          </p>

          {plan || propertyPlanType ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {cardData.map((item, index) => (
                <Card key={index} className="shadow-none border">
                  <CardBody className="px-6">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="bg-[#192D4D] rounded-full p-2">
                        {item.icons}
                      </div>
                      <div>
                        <span className="text-sm text-default-500">
                          {item.title}
                        </span>
                       <div
                        className="flex h-5 items-center space-x-4 text-md font-medium"
                      >
                        {item.data || "Not Available"}
                      </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : null}
        </div>

        <div className="w-full flex justify-center items-center rounded-lg">
          <PhotoProvider>
            {plan?.image ? (
              <div className="py-4 px-4">
                <PhotoView
                  src={`${apiUrl}/properties/plans/${plan.image}`}
                >
                  <Image
                    alt="Master Plan Image"
                    className="rounded-lg w-full"
                    src={`${apiUrl}/properties/plans/${plan.image}`}
                  />
                </PhotoView>
              </div>
            ) : (
              <div className="flex justify-center items-center h-[450px]">
                <EmptyData fallbackname="Master Plan Image" />
              </div>
            )}
          </PhotoProvider>
        </div>
      </div>
    </section>
  );
};

export default BuildingPlanSection;