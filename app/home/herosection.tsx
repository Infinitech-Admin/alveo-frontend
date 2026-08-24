"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Image } from "@heroui/react";
import FilterPropertyModal from "@/components/modal/fileterproperty";
import { MdArrowOutward } from "react-icons/md";
import { toSlug } from "@/utils/slug";
import { raleway } from "@/utils/font";

interface PropertyData {
  id: string | number;
  property?: {
    name?: string;
    slogan?: string;
  };
  property_description?: string;
  images?: string | string[];
}

// Sample data used in place of the featured-property API response
const SAMPLE_PROPERTY: PropertyData = {
  id: "sample-property-01",
  property: {
    name: "Ella Residences",
    slogan: "Discover Your Next Space",
  },
  property_description:
    "A curated collection of modern homes designed for comfortable living, just minutes from the city center.",
  images: [],
};

const HeroSection = () => {
  const router = useRouter();

  const [property] = useState<PropertyData>(SAMPLE_PROPERTY);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleVisitProperty = () => {
    if (!property?.id || !property?.property?.name) return;

    setButtonLoading(true);

    const propertyName = toSlug(property.property.name);
    const propertyId = toSlug(String(property.id));
    const description = toSlug(property.property_description || "");

    router.push(`/${propertyName}/${propertyId}/${description}`);
  };

  return (
    <section className="relative min-h-[400px] w-full overflow-hidden bg-cover bg-center bg-no-repeat lg:min-h-[550px]"
      style={{ backgroundImage: "url('/hero-banner.png')", }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 z-0 bg-black/10" />

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="relative flex flex-col justify-start mx-6 lg:mx-0">
          <div className="relative z-40 w-full pt-12">
            <h1>
              <span className={`block text-5xl text-gray-100 font-bold leading-tight lg:text-6xl ${raleway.className}`}>
                Discover Your Next Space
              </span>
            </h1>
            <p className="mt-5 max-w-md lg:max-w-2xl leading-relaxed text-gray-200 text-md lg:text-xl">
              A curated collection of modern homes thoughtfully designed for comfortable, elevated living, offering stylish spaces, 
              exceptional amenities, and convenient access to the city’s key destinations.
            </p>

            {/* CTA */}
            <div className="relative z-50 mt-7 gap-4 flex justify-start sm:mt-8">
              <a href="/properties">
                <Button
                  size="lg"
                  className="bg-[#192D4D] px-6 font-semibold text-white shadow-lg shadow-black/10 transition-all hover:bg-[#192D4D]/70 hover:shadow-xl"
                >
                  Look into Properties
                </Button>
              </a>
              <a href="/contact">
                <Button
                  size="lg"
                  href="/contact"
                  className="border-2 border-[#192D4D] bg-transparent px-6 font-semibold text-white shadow-lg shadow-black/10 transition-all hover:bg-[#192D4D] hover:shadow-xl"
                >
                  Contact Us
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile Filter */}
          <div className="relative z-50 mt-auto flex w-full justify-center pb-8 pt-10 sm:pb-10 xl:hidden">
            <FilterPropertyModal />
          </div>
        </div>
      </div>

      {/* DESKTOP FILTER */}
      <div className="absolute bottom-0 left-0 z-10 hidden w-full justify-center px-6 pb-6 xl:flex xl:px-24">
        <FilterPropertyModal />
      </div>
    </section>
  );
};

export default HeroSection;