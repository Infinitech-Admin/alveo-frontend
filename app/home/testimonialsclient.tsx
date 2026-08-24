"use client";
import {
    Card,
    CardBody,
    CardFooter,
    Divider,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

interface Testimonial {
    name: string;
    message: string;
    created_at: string;
}
interface TestimonialProps {
    data: Testimonial[];
}

const animation = { duration: 50000, easing: (t: number) => t };

const TestimonialClients: React.FC<TestimonialProps> = ({ data }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        renderMode: "performance",
        drag: true, // Allow manual dragging
        slides: { perView: 1, spacing: 15 }, // Default spacing
        created(s) {
            s.moveToIdx(5, true, animation);
        },
        updated(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation);
        },
        animationEnded(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation);
        },
        breakpoints: {
            "(max-width: 400px)": {
                slides: { perView: 1, spacing: 15 },
            },
            "(min-width: 720px) and (max-width: 999px)": {
                slides: { perView: 2, spacing: 15 },
            },
            "(min-width: 1000px)": {
                slides: { perView: 3, spacing: 20 },
            },
        },
    });

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
    useEffect(() => {
        if (slider.current) {
            slider.current.update(); // Recalculate layout
        }
    }, [data]);

    return (
        <div className="relative py-4">
            <div ref={sliderRef} className="keen-slider">
                <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-black/25 via-black/10 to-transparent sm:w-24 lg:w-32" />
                <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-black/25 via-black/10 to-transparent sm:w-24 lg:w-32" />

                {data.map((testimonial, index) => (
                    <div key={index} className="keen-slider__slide">
                        <Card className="bg-gray-100 shadow-none mb-4 min-h-[250px]">
                            <CardBody className="py-6">
                                <p className="text-md text-default-500 italic inline">
                                    &quot;
                                    {expandedIndex === index || testimonial.message.length <= 200
                                        ? testimonial.message
                                        : `${testimonial.message.slice(0, 200)}...`}
                                    &quot;
                                    {testimonial.message.length > 200 && (
                                        <span
                                            onClick={() => toggleExpand(index)}
                                            className="ml-2 text-blue-600 cursor-pointer"
                                        >
                                            {expandedIndex === index ? "See Less" : "See More"}
                                        </span>
                                    )}
                                </p>
                            </CardBody>

                            <Divider />
                            <CardFooter className="flex flex-col justify-start items-start">
                                <h1 className="font-bold text-start text-lg text-[#192D4D] py-2">
                                    {testimonial.name}
                                </h1>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialClients;
