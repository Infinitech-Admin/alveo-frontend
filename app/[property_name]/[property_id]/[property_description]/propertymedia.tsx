"use client";

import React, { useEffect, MutableRefObject } from "react";
import { Image } from "@heroui/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import {
    useKeenSlider,
    KeenSliderPlugin,
    KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// Thumbnail Plugin for Keen Slider
function ThumbnailPlugin(
    mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => slide.classList.remove("active"));
        }
        function addActive(idx: number) {
            slider.slides[idx]?.classList.add("active");
        }
        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx);
                });
            });
        }

        slider.on("created", () => {
            if (!mainRef.current) return;
            addActive(slider.track.details.rel);
            addClickEvents();
            mainRef.current.on("animationStarted", (main) => {
                removeActive();
                const next = main.animator.targetIdx || 0;
                addActive(main.track.absToRel(next));
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
            });
        });
    };
}

interface Listings {
    images: string;
}

interface ListingsMediaProps {
    data: Listings;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";

const PropertyImage: React.FC<ListingsMediaProps> = ({ data }) => {
    // Main slider for small devices
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        slides: { perView: 1, spacing: 5 },
    });

    // Thumbnail slider for large devices
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 10,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    );

    // Handle Prev and Next with safety checks
    const handlePrev = () => {
        instanceRef.current?.prev();
    };

    const handleNext = () => {
        instanceRef.current?.next();
    };

    // Default fallback image
    const defaultImage =
        "https://www.dmcihomes.com/uploads/media/executives-1563253639282.jpg";

    let parsedImages: string[] = [];

    // Parse images safely
    try {
        parsedImages = JSON.parse(data.images || "[]");
    } catch (error) {
        console.error("Error parsing images:", error);
    }

    // Main image for large screens
    const mainImage = parsedImages.length
        ? `${apiUrl}/properties/images/${parsedImages[0]}`
        : defaultImage;

    return (
        <PhotoProvider>
            <div>
                {/* For Large Screens */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-2">
                    {/* Main Image Section */}
                    <div className="col-span-1 md:col-span-2">
                        <PhotoView data-title="Main Image" src={mainImage}>
                            <Image
                                alt="Main Image"
                                className="w-full rounded-lg object-cover"
                                height={510}
                                width={1000}
                                src={mainImage}
                            />
                        </PhotoView>
                    </div>

                    {/* Thumbnail Section */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-2">
                        {Array.from({ length: 4 }).map((_, index) => {
                            const image = parsedImages[index + 1]; // Skip the first image
                            const imageUrl = image
                                ? `${apiUrl}/properties/images/${image}`
                                : defaultImage;

                            return (
                                <PhotoView
                                    key={index}
                                    data-title={`Thumbnail ${index + 1}`}
                                    src={imageUrl}
                                >
                                    <Image
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full rounded-lg object-cover"
                                        height={250}
                                        width={1000}
                                        src={imageUrl}
                                    />
                                </PhotoView>
                            );
                        })}
                    </div>
                </div>

                {/* For Small Screens */}
                <div className="md:hidden">
                    {/* Main Slider */}
                    <div className="relative">
                        <div ref={sliderRef} className="keen-slider">
                            {parsedImages.length > 0 ? (
                                parsedImages.map((image, index) => (
                                    <div key={index} className="keen-slider__slide">
                                        <PhotoView
                                            data-title={`Slide ${index + 1}`}
                                            src={`${apiUrl}/properties/images/${image}`}
                                        >
                                            <Image
                                                alt={`Slide ${index + 1}`}
                                                className="w-full h-auto object-cover rounded-lg"
                                                src={`${apiUrl}/properties/images/${image}`}
                                                width={1000}
                                                height={300}
                                            />
                                        </PhotoView>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">No images available</p>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4 z-10">
                            <button
                                className="bg-blue-600 opacity-50 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition hover:opacity-100"
                                onClick={handlePrev}
                            >
                                &#8249; {/* Left arrow */}
                            </button>
                            <button
                                className="bg-blue-600 opacity-50 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition hover:opacity-100"
                                onClick={handleNext}
                            >
                                &#8250; {/* Right arrow */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PhotoProvider>
    );
};

export default PropertyImage;
