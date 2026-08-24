import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import React from "react";
import "lightbox2/dist/css/lightbox.min.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface Testimonial {
    name: string;
    image: string;
    created_at: string;
}

interface TestimonialProps {
    data: Testimonial[];
}

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
};
const animation = { duration: 50000, easing: (t: number) => t };
const ContractSigning: React.FC<TestimonialProps> = ({ data }) => {

    // Sort data by date (newest first)
    const sortedData = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

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
                slides: { perView: 6, spacing: 15 },
            },
        },
    });

    return (
        <div>
            <div ref={sliderRef} className="keen-slider">
                <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-black/25 via-black/10 to-transparent sm:w-24 lg:w-32" />
                <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-black/25 via-black/10 to-transparent sm:w-24 lg:w-32" />

                {sortedData.map((testimonial, index) => (
                    <div key={index} className="keen-slider__slide">
                        <Card>
                            <Image
                                removeWrapper
                                alt="Card background"
                                className="z-0 w-full object-top"
                                src={`https://infinitech-api6.site/contracts/${testimonial.image}`}
                                height={350}
                                width={150}
                            />
                            <CardFooter className="absolute z-10 bottom-0 flex-col !items-start bg-gradient-to-t from-black/35 via-black/15 to-transparent">
                                <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                                <p className="text-md text-white/60 uppercase font-semibold">{formatDate(testimonial.created_at)}</p>
                            </CardFooter>

                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContractSigning;
