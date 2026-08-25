"use client";

import React, { MutableRefObject } from "react";
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
  mainRef: MutableRefObject<KeenSliderInstance | null>,
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
          if (mainRef.current) {
            mainRef.current.moveToIdx(idx);
          }
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

        slider.moveToIdx(
          Math.min(slider.track.details.maxIdx, next),
        );
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

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

// Fallback image
const defaultImage = "/photo_2026-08-25_11-13-34.jpg";

const PropertyImage: React.FC<ListingsMediaProps> = ({ data }) => {
  // Main slider
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slides: {
      perView: 1,
      spacing: 5,
    },
  });

  // Thumbnail slider
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)],
  );

  const handlePrev = () => {
    instanceRef.current?.prev();
  };

  const handleNext = () => {
    instanceRef.current?.next();
  };

  // Track failed images
  const [failedImages, setFailedImages] = React.useState<Set<string>>(
    new Set(),
  );

  const getSrc = (url: string) => {
    return failedImages.has(url) ? defaultImage : url;
  };

  const handleImageError = (url: string) => () => {
    setFailedImages((prev) => {
      if (prev.has(url)) return prev;

      const next = new Set(prev);
      next.add(url);

      return next;
    });
  };

  // Parse images
  let parsedImages: string[] = [];

  try {
    parsedImages = JSON.parse(data.images || "[]");
  } catch (error) {
    console.error("Error parsing images:", error);
  }

  const mainImage = parsedImages.length
    ? `${apiUrl}/properties/images/${parsedImages[0]}`
    : defaultImage;

  return (
    <PhotoProvider>
      <div className="w-full">
        {/* =========================
            LARGE SCREEN
        ========================== */}
        <div className="hidden md:grid md:grid-cols-4 gap-2 w-full">
          {/* Main Image */}
          <div
            className="md:col-span-2 h-[510px] rounded-lg overflow-hidden"
          >
            <PhotoView
              data-title="Main Image"
              src={getSrc(mainImage)}
            >
              <div className="w-full h-full cursor-pointer">
                <Image
                  alt="Main Image"
                  className={`w-full h-full object-cover rounded-lg ${
                    failedImages.has(mainImage)
                      ? "object-contain p-12"
                      : "object-cover"
                  }`}
                  src={getSrc(mainImage)}
                  width={1000}
                  height={510}
                  removeWrapper
                  onError={handleImageError(mainImage)}
                />
              </div>
            </PhotoView>
          </div>

          {/* Thumbnails */}
          <div className="md:col-span-2 grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, index) => {
              const image = parsedImages[index + 1];

              const imageUrl = image
                ? `${apiUrl}/properties/images/${image}`
                : defaultImage;

              const isFallback =
                !image || failedImages.has(imageUrl);

              return (
                <div
                  key={index}
                  className="h-[249px] rounded-lg overflow-hidden"
                >
                  <PhotoView
                    data-title={`Thumbnail ${index + 1}`}
                    src={getSrc(imageUrl)}
                  >
                    <div className="w-full h-full cursor-pointer">
                      <Image
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-full h-full rounded-lg ${
                          isFallback
                            ? "object-contain p-8"
                            : "object-cover"
                        }`}
                        src={getSrc(imageUrl)}
                        width={1000}
                        height={250}
                        removeWrapper
                        onError={handleImageError(imageUrl)}
                      />
                    </div>
                  </PhotoView>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================
            SMALL SCREEN
        ========================== */}
        <div className="md:hidden w-full">
          <div className="relative">
            <div
              ref={sliderRef}
              className="keen-slider rounded-lg overflow-hidden"
            >
              {parsedImages.length > 0 ? (
                parsedImages.map((image, index) => {
                  const slideUrl = `${apiUrl}/properties/images/${image}`;

                  const isFallback =
                    failedImages.has(slideUrl);

                  return (
                    <div
                      key={index}
                      className="keen-slider__slide h-[300px] rounded-lg overflow-hidden"
                    >
                      <PhotoView
                        data-title={`Slide ${index + 1}`}
                        src={getSrc(slideUrl)}
                      >
                        <div className="w-full h-full cursor-pointer">
                          <Image
                            alt={`Slide ${index + 1}`}
                            className={`w-full h-full rounded-lg ${
                              isFallback
                                ? "object-contain p-10"
                                : "object-cover"
                            }`}
                            src={getSrc(slideUrl)}
                            width={1000}
                            height={300}
                            removeWrapper
                            onError={handleImageError(slideUrl)}
                          />
                        </div>
                      </PhotoView>
                    </div>
                  );
                })
              ) : (
                <div
                  className="keen-slider__slide h-[300px] rounded-lg overflow-hidden flex items-center justify-center">
                  <Image
                    alt="No images available"
                    className="w-full h-full object-contain p-10"
                    src={defaultImage}
                    width={1000}
                    height={300}
                    removeWrapper
                  />
                </div>
              )}
            </div>

            {/* Navigation */}
            {parsedImages.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 z-10 pointer-events-none">
                <button
                  type="button"
                  aria-label="Previous image"
                  className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-[#11398D]/70 text-white text-2xl hover:bg-[#11398D] transition-all duration-200"
                  onClick={handlePrev}
                >
                  &#8249;
                </button>

                <button
                  type="button"
                  aria-label="Next image"
                  className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-[#11398D]/70 text-white text-2xl hover:bg-[#11398D] transition-all duration-200"
                  onClick={handleNext}
                >
                  &#8250;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PhotoProvider>
  );
};

export default PropertyImage;