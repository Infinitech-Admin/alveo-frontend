'use client'
import { Button, Card, CardBody, Divider } from "@heroui/react";
import React from "react";
import Link from "next/link";
import { LuBed, LuBuilding2, LuCalendar, LuCalendarRange, LuConstruction, LuLandPlot, LuMapPin, LuMessageCircleQuestion, LuTags } from "react-icons/lu";
import { filterMaxPrice, formatParking, priceFormatted } from "@/utils/priceformat";
import SendInquiry from "./sendinquiry";
import SendAppointment from "./sendappointment";


interface Property {
    id: string;
    property_price: number;
    status: string;
    property_type: string;
    property_name: string;
    property_location: string;
    property_description: string;
    property_size: string;
    property_level: string;
    property_parking: string;
    property: {
        name: string;
    }

}

interface DetailSectionProps {
    data: Property;
}
const getOrdinalSuffix = (num: string | number) => {
    const n = parseInt(num as string);
    const rem10 = n % 10;
    const rem100 = n % 100;
  
    if (isNaN(n)) return "";
  
    if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  
    switch (rem10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  };
const DetailSection: React.FC<DetailSectionProps> = ({ data }) => {
    const cardData = [
        {
            icons: <LuTags className="text-2xl text-[#79a0dd]" />,
            title: "Price",
            data: priceFormatted(data.property_price),
        },
        {
            icons: <LuBed className="text-2xl text-[#79a0dd]" />,
            title: "Unit/PS Type",
            data: data.property_type,
        },
        {
            icons: <LuLandPlot className="text-2xl text-[#79a0dd]" />,
            title: "Unit Area",
            data: `${data.property_size} Sqm.`,
        },
        {
            icons: <LuBuilding2 className="text-2xl text-[#79a0dd]" />,
            title: "Floor Level",
            data: `${getOrdinalSuffix(data.property_level)} Floor`,
        },
        
        
    ];
    return (
        <section className="w-full flex flex-col justify-center py-8">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-2">
                {cardData.map((item, index) => (
                    <Card key={index}>
                        <CardBody className="px-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#192D4D] rounded-full p-2">
                                    {item.icons}
                                </div>
                                <div>
                                    <span className="text-sm text-default-500">{item.title}</span>
                                    <div className="flex items-center space-x-4 font-medium">
                                        {item.data}
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}

            </div>

            <div className="py-8">
                <div className="flex flex-col space-y-4">
                    <div>
                        <h1 className="font-bold text-xl md:text-3xl mt-2">
                            {data.property_type} {data.property_parking == "N/A" ? "" : data.property_parking} - {data.property.name}
                        </h1>
                        <div className="flex items-center gap-2">
                            <LuMapPin />
                            <p className="text-default-500 text-md">
                                {data.property_location}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-default-500 text-md max-w-4xl">
                            {data.property_description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailSection;
