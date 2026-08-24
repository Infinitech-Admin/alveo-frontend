"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Tab, Tabs, Button, useDisclosure, Spinner } from "@heroui/react";
import { LuPenLine } from "react-icons/lu";

import { getAuthHeaders } from "../auth";
import TestimonialClients from "./testimonialsclient";
import ContractSigning from "./contract";
import TestimonialSlider from "./testemonialslider";
import TestimonialModal from "./testimonialsection";

type Testimonial = {
  id: string;
  user_id: string;
  name: string;
  message: string;
  created_at: string;
  status: string;
};

type TestimonialVideo = {
  id: string;
  user_id: string;
  name: string;
  video: string;
  thumbnail: string;
};

type Contract = {
  id: string;
  name: string;
  image: string;
  created_at: string;
};

type UserResponse = {
  record?: {
    videos?: TestimonialVideo[];
    testimonials?: Testimonial[];
    contracts?: Contract[];
  };
};

const fetcher = async (url: string): Promise<UserResponse> => {
  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch testimonials: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState("gallery");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

  const { data, error, isLoading, mutate } = useSWR<UserResponse>(
    `${apiUrl}/api/user`,
    fetcher,
  );

  /*
   * Loading
   */
  if (isLoading) {
    return (
      <section className="flex min-h-[400px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" color="success" />
          <p className="text-sm text-default-500">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  /*
   * Error
   */
  if (error) {
    return (
      <section className="w-full py-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <h3 className="font-semibold text-red-600">
            Unable to load testimonials
          </h3>

          <p className="mt-2 text-sm text-red-500">Please try again later.</p>
        </div>
      </section>
    );
  }

  const videos = data?.record?.videos ?? [];

  const clientTestimonials =
    data?.record?.testimonials?.filter(
      (testimonial) => testimonial.status === "active",
    ) ?? [];

  const contracts = data?.record?.contracts ?? [];

  return (
    <section className="w-full py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-6">
        {/* Title */}
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-[#2B2118]">
            What people are saying
          </h2>

          <p className="mt-2 max-w-2xl text-md leading-6 text-default-500 sm:text-base">
            Real stories from clients, straight from them.
          </p>
        </div>

        {/* Tabs + CTA */}
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            aria-label="Testimonials"
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(String(key))}
            color="primary"
            variant="underlined"
            className="w-full sm:w-auto"
            classNames={{
              tabList: "w-full sm:w-auto gap-4 overflow-x-auto",
              tab: "px-2 py-2 text-xs sm:text-sm md:text-base",
              cursor: "bg-[#192D4D]",
              tabContent: "group-data-[selected=true]:text-[#192D4D]",
            }}
          >
            <Tab key="gallery" title="Videos" />

            <Tab key="testimonials" title="Testimonials" />

            <Tab key="contract" title="Contract Signing" />
          </Tabs>

          {/* Write Testimonial */}
          <Button
            onPress={onOpen}
            startContent={<LuPenLine size={17} />}
            className="w-full bg-[#192D4D] font-medium uppercase text-white shadow-sm transition-colors hover:bg-[#192D4D]/90 sm:w-auto"
          >
            Write a testimonial
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-[300px] w-full">
        {/* Videos */}
        {activeTab === "gallery" && (
          <div className="w-full">
            {videos.length > 0 ? (
              <TestimonialSlider data={videos} />
            ) : (
              <EmptyState message="No testimonial videos available yet." />
            )}
          </div>
        )}

        {/* Client Testimonials */}
        {activeTab === "testimonials" && (
          <div className="w-full">
            {clientTestimonials.length > 0 ? (
              <TestimonialClients data={clientTestimonials} />
            ) : (
              <EmptyState message="No testimonials available yet." />
            )}
          </div>
        )}

        {/* Contract Signing */}
        {activeTab === "contract" && (
          <div className="w-full">
            {contracts.length > 0 ? (
              <ContractSigning data={contracts} />
            ) : (
              <EmptyState message="No contract signing stories available yet." />
            )}
          </div>
        )}
      </div>

      {/* Testimonial Modal */}
      <TestimonialModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmitted={() => {
          mutate();
          onClose();
        }}
      />
    </section>
  );
};

/*
 * Empty State
 */
const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex min-h-[280px] w-full items-center justify-center rounded-2xl border border-[#2B2118]/10 bg-gray-50 px-6 text-center">
      <p className="text-sm text-default-500 sm:text-base">{message}</p>
    </div>
  );
};

export default Testimonials;
