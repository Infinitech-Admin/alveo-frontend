"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { LuArrowRight, LuBuilding2, LuPhone } from "react-icons/lu";

export default function CTA() {
  return (
    <section className="w-full bg-[#192D4D] px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          Ready to take the next step?
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
          Discover a property that fits your lifestyle or get in touch with
          our team to find the right space for you.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          {/* Properties */}
          <Button
            as={Link}
            href="/properties"
            size="lg"
            radius="full"
            className="w-full bg-white px-7 font-semibold text-[#192D4D] shadow-lg transition-all hover:scale-[1.02] hover:bg-white/90 sm:w-auto"
            endContent={<LuBuilding2 size={19} />}
          >
            View Properties
          </Button>

          {/* Contact Us */}
          <Button
            as={Link}
            href="/contact"
            size="lg"
            radius="full"
            variant="bordered"
            className="w-full border-white/70 px-7 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-white/10 sm:w-auto"
            endContent={<LuPhone size={18} />}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}