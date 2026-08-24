"use client";

import React, { useEffect, useState } from "react";
import CompanyInfo from "@/components/companycontactinfo";
import ContactForm from "@/components/contactform";
import { getAuthHeaders } from "../auth";

async function fetchProperties() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";
  const endpoint = `${apiUrl}/api/user/properties`;

  try {
    const headers = getAuthHeaders();
    const res = await fetch(endpoint, {
      method: "GET",
      headers,
      cache: "no-cache",
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch properties: ${res.status} - ${res.statusText}`,
      );

      return [];
    }
    const data = await res.json();

    return data.records;
  } catch (error) {
    console.error("An error occurred while fetching properties:", error);

    return [];
  }
}

const ContactUs = () => {
  const [properties, setProperties] = useState<[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProperties();
      setProperties(data);
    };

    fetchData();
  }, []);

  return (
    <section className="px-4 py-6 sm:px-6 md:py-8 lg:px-8">
      <div className="grid grid-cols-1 text-start lg:grid-cols-2 pt-8 gap-8 lg:items-start">
        <div>
          <div className="mb-8">
            <h1 className="font-bold text-3xl pb-4 uppercase">
              Contact Us
            </h1>
            <p className="text-md text-default-500">
              Leave us a message and we will get back to you as soon as
              possible.
            </p>
          </div>
          <div>
            <ContactForm data={properties} />
          </div>
        </div>

        <div className="px-0 lg:px-8">
          <CompanyInfo />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
