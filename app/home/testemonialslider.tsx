"use client";

import { useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { LuPlay } from "react-icons/lu";

interface Testimonial {
  id: string;
  user_id: string;
  name: string;
  video: string;
  thumbnail: string;
}

interface TestimonialProps {
  data: Testimonial[];
}

const animation = {
  duration: 50000,
  easing: (t: number) => t,
};

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (!videoRef.current) return;

    videoRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Video playback failed:", error);
      });
  };

  return (
    <div className="keen-slider__slide relative overflow-hidden rounded-xl border border-[#1B3A8C]/10 bg-white shadow-md">
      <video
        ref={videoRef}
        src={`${apiUrl}/video/${testimonial.video}`}
        poster={`${apiUrl}/video/${testimonial.thumbnail}`}
        className="h-80 w-full rounded-xl object-cover"
        style={{ aspectRatio: "16/9" }}
        controls={isPlaying}
        playsInline
      />

      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={`Play testimonial from ${testimonial.name}`}
          className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/30 transition-all duration-300 hover:bg-black/45"
        >
          <span
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-white/95
              shadow-xl
              transition-transform
              duration-300
              hover:scale-110
            "
          >
            <LuPlay
              size={28}
              fill="currentColor"
              className="ml-1 text-[#1B3A8C]"
            />
          </span>
        </button>
      )}
    </div>
  );
};

const TestimonialSlider: React.FC<TestimonialProps> = ({ data }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: true,

    slides: {
      perView: 1,
      spacing: 15,
    },

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
      "(max-width: 639px)": {
        slides: {
          perView: 1,
          spacing: 15,
        },
      },

      "(min-width: 640px) and (max-width: 999px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },

      "(min-width: 1000px)": {
        slides: {
          perView: 3,
          spacing: 15,
        },
      },
    },
  });

  return (
    <div className="relative w-full">
      {/* Slider wrapper */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-black/25 via-black/10 to-transparent sm:w-24 lg:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-black/25 via-black/10 to-transparent sm:w-24 lg:w-32" />

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {data.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
