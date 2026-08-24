"use client";

import React from "react";
import useSWR from "swr";
import {
  Accordion,
  AccordionItem,
  Spinner,
} from "@heroui/react";
import { getAuthHeaders } from "../auth";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  status: string;
}

interface FAQResponse {
  records: FAQ[];
}

const fetcher = async (url: string): Promise<FAQResponse> => {
  const res = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch FAQ data");
  }

  return res.json();
};

const FrequentlyAskQuestions = () => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://infinitech-api6.site";

  const { data, error, isLoading } = useSWR<FAQResponse>(
    `${apiUrl}/api/user/questions`,
    fetcher
  );

  const faqData =
    data?.records?.filter(
      (faq) => faq.status === "active"
    ) ?? [];

  return (
    <section className="w-full py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-center items-center">
        <h1 className="pt-4 text-3xl font-bold uppercase tracking-tight text-[#2B2118]">
          Frequently Asked Questions
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-default-500 text-center">
          Find answers to the most common questions about our
          services, processes, and policies.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Spinner
              size="lg"
              color="success"
            />

            <p className="text-sm text-default-500">
              Loading FAQs...
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="flex min-h-[250px] items-center justify-center">
          <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-5 text-center">
            <p className="font-medium text-red-600">
              Failed to load FAQs.
            </p>

            <p className="mt-1 text-sm text-red-500">
              Please try again later.
            </p>
          </div>
        </div>
      )}

      {/* Empty */}
      {!isLoading &&
        !error &&
        faqData.length === 0 && (
          <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-[#2B2118]/10 bg-gray-50 px-6 text-center">
            <p className="text-sm text-default-500">
              No frequently asked questions available.
            </p>
          </div>
        )}

      {/* FAQ */}
      {!isLoading && !error && faqData.length > 0 && (
        <div className="flex w-full justify-center">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#192D4D]/10 bg-white shadow-sm">
            <Accordion
              variant="light"
              selectionMode="multiple"
              itemClasses={{
                base: "border-b border-[#192D4D]/10 last:border-b-0 sm:px-4",
                title:
                  "text-sm font-semibold text-[#192D4D] pr-3 sm:text-base lg:text-lg",
                trigger:
                  "min-h-16 rounded-xl px-3 py-4 sm:px-4 sm:py-5",
                indicator:
                  "text-[#192D4D]",
                content:
                  "px-3 pb-5 text-sm leading-6 text-[#192D4D]/60 sm:px-4 sm:pb-6 sm:text-base sm:leading-7",
              }}
            >
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  aria-label={`Frequently asked question ${index + 1}`}
                  title={
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 text-xs font-bold text-[#192D4D] sm:text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="leading-6 sm:leading-7">
                        {faq.question}
                      </span>
                    </div>
                  }
                >
                  <p className="max-w-2xl">
                    {faq.answer}
                  </p>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      )}
    </section>
  );
};

export default FrequentlyAskQuestions;