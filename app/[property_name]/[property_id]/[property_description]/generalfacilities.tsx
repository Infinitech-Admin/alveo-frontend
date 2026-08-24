"use client";

import EmptyData from "@/components/fallback/emptydata";
import { Image } from "@heroui/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface Facility {
  name: string;
  image: string;
}

interface GeneralFacilitiesProps {
  data: Facility[];
}

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

const GeneralFacilities: React.FC<GeneralFacilitiesProps> = ({ data }) => {
  return (
    <section className="w-full flex flex-col justify-center py-8">
      <h1 className="font-bold text-2xl uppercase">General Facilities</h1>
      <p className="text-sm text-default-500 max-w-2xl">
        Discover the essential facilities available in our development, crafted
        to provide convenience, comfort, and a seamless living experience for
        all residents.
      </p>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5  md:gap-4 mt-8">
        {data.length > 0 ? (
          <PhotoProvider>
            {data.map((facility, index) => (
              <PhotoView
                key={index}
                src={`${apiUrl}/properties/facilities/${facility.image}`}
              >
                <div className="relative cursor-pointer">
                  <Image
                    alt={facility.name}
                    className="w-full h-[120px] object-cover overflow-hidden rounded-lg"
                    src={`${apiUrl}/properties/facilities/${facility.image}`}
                    width={1000}
                  />
                  <div className="absolute z-20 inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center text-white font-semibold capitalize text-sm rounded-lg">
                    {facility.name}
                  </div>
                </div>
              </PhotoView>
            ))}
          </PhotoProvider>
        ) : (
          <div className="col-span-6">
            <EmptyData fallbackname="General Facilities" />
          </div>
        )}
      </div>
    </section>
  );
};

export default GeneralFacilities;
