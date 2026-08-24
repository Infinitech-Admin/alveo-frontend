"use client";
import { Image } from "@heroui/react";
import React, { useEffect, useState } from "react";

interface Property {
  name: string;
  description: string;
  logo: string;
  images: string | string[];
}

interface MainSectionProps {
  data: Property;
}

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

const MainSection: React.FC<MainSectionProps> = ({ data }) => {
  let images: string[] = [];

  if (typeof data.images === "string") {
    try {
      images = JSON.parse(data.images);
    } catch (error) {
      console.error("Error parsing images:", error);
    }
  } else if (Array.isArray(data.images)) {
    images = data.images;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500); // Time to switch images
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full flex justify-center mt-0">
      <div className="relative w-full h-[500px] rounded-3xl overflow-hidden">
        {/* Background Image with Fade Effect */}
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${apiUrl}/properties/images/${images[currentIndex]}')`,
          }}
        />

        <div className="absolute z-10 inset-0 bg-black bg-opacity-30 rounded-3xl" />

        {/* Content */}
        <div className="absolute z-20 top-0 left-0 right-0 px-4 md:px-8 py-12 text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <Image
              alt="data logo"
              className="py-8 mx-auto md:mx-0 text-center"
              src={`${apiUrl}/properties/logos/${data.logo}`}
              width={200}
            />
          </div>

          <h1 className="text-white text-4xl break-words md:text-5xl font-bold">
            {data.name}
          </h1>
          <p className="text-default-200 text-md md:w-1/2 md:text-lg dark:text-white mt-4">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
