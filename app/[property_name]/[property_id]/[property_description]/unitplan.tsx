'use client'
import EmptyData from "@/components/fallback/emptydata";
import { Card, CardBody, Image } from "@heroui/react";
import React from "react";
import { LuBadgeCheck, LuBuilding2, LuScissors } from "react-icons/lu";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface Property {
    property_building?: string;
    property_plan_cut?: string;
    property_plan_status?: string;
    property_plan_image?: string;
}

interface MasterPlanSectionProps {
    data?: Property;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";

const MasterPlanSection: React.FC<MasterPlanSectionProps> = ({ data }) => {
    const cardData = [
        {
            icons: <LuBuilding2 className="text-xl text-[#0F1B2E]" />,
            title: "Building",
            data: data?.property_building,
        },

        {
            icons: <LuScissors className="text-xl text-[#0F1B2E]" />,
            title: "Unit Cut",
            data: data?.property_plan_cut,
        },

        {
            icons: <LuBadgeCheck className="text-xl text-[#0F1B2E]" />,
            title: "Unit Status",
            data: data?.property_plan_status,
        },
    ];

    return (
        <section className="w-full flex flex-col justify-center py-24 mt-0">
            <div className="flex flex-col gap-4 items-center">
                <div className="w-full">
                    <h1 className="font-bold text-2xl uppercase">Master Plan</h1>
                    <p className="text-sm text-default-500 max-w-2xl">
                        Discover the full layout of our development — including the type of build, available unit cuts, and current status — thoughtfully designed to align with your needs and lifestyle.
                    </p>

                    {data ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {cardData.map((item, index) => (
                                <Card key={index} className="shadow-none border">
                                    <CardBody className="px-6">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#192D4D] rounded-full p-2">
                                                {item.icons}
                                            </div>
                                            <div>
                                                <span className="text-sm text-default-500">{item.title}</span>
                                                <div className="flex h-5 items-center space-x-4 text-lg font-medium">
                                                    {item.data || "Unit data Not Found"}
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    ) : null}
                </div>

                <div className="w-full border flex justify-center items-center rounded-lg ">
                    <PhotoProvider>
                        {data?.property_plan_image ? (
                            <div className="py-4">
                                <PhotoView src={`${apiUrl}/properties/images/${data.property_plan_image}`}>
                                    <Image
                                        alt="Master Plan Image"
                                        className="rounded-lg  w-full"
                                        src={data.property_plan_image
                                            ? `${apiUrl}/properties/images/${data.property_plan_image}`
                                            : "https://via.placeholder.com/600x400?text=No+Image+Available"}
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

export default MasterPlanSection;
