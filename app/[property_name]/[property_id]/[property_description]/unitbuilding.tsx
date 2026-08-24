'use client'
import EmptyData from "@/components/fallback/emptydata";
import { Image } from "@heroui/react";
import React from "react";

interface Building {
  parking: number;
  floors: number;
  image: string;
  name: string;
}

interface Property {
  buildings: Building[];
}

interface BuildingSectionProps {
  data: Property;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";

const BuildingSection: React.FC<BuildingSectionProps> = ({ data }) => {
  return (
    <section className="w-full flex flex-col justify-center py-8 mt-0">
      <div>
        <h1 className="font-bold text-2xl uppercase">Building</h1>
        <p className="text-sm text-default-500 max-w-md">
          Each building is uniquely designed to complement the needs of its
          residents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 py-8">
        {data?.buildings && data.buildings.length > 0 ? (
          data.buildings.map((build, index) => (
            <div key={index} className="relative">
              <Image
                isZoomed
                alt="NextUI hero Image"
                height={450}
                width={1000}
                src={`${apiUrl}/properties/buildings/${build.image}`}
              />

              <div className="absolute inset-0 bg-black bg-opacity-60 rounded-2xl z-10 hover:bg-opacity-20" />

              <div className="absolute bottom-5 left-6 z-20">

                <div className="py-2">
                  <h1 className="text-white text-xl font-bold uppercase">{build.name}</h1>
                  <p className="text-tiny leading-3 text-[#79a0dd]">
                    Mid Rise Condominiums
                  </p>
                </div>
                <div className="py-2">
                  <h1 className="text-white text-xl font-bold">
                    {build.floors} {build.floors === 1 ? "Level" : "Levels"}
                  </h1>

                  <p className="text-tiny leading-3 text-[#79a0dd]">
                    Residential
                  </p>
                </div>
                <div className="py-2">
                  <h1 className="text-white text-xl font-bold">
                    {build.parking} {build.parking === 1 ? "Level" : "Levels"}
                  </h1>
                  <p className="text-tiny leading-3 text-[#79a0dd]">
                    Basement Parking
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyData fallbackname={"Building"} />
          </div>

        )}

      </div>
    </section>
  );
};

export default BuildingSection;
